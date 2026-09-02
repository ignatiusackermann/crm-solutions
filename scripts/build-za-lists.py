#!/usr/bin/env python3
"""Build PHPList-ready batches from the biz-accelerator category workbooks.

Mirrors the filtering already applied to phplist-batches-hospitality: every row
must have a working-looking address on the business's own domain, a website, and
one contact per domain. Free and ISP mailboxes are dropped — they are usually a
personal address rather than the business, and they hurt both deliverability and
the POPIA position (a juristic person at a published business address is far
safer ground than someone's private mailbox).

Reads the .xlsx directly from its zip container, so no pandas/openpyxl needed.

    python scripts/build-za-lists.py "Medical Practitioners" --probe
    python scripts/build-za-lists.py "Medical Practitioners" --out <dir>
"""

from __future__ import annotations

import argparse
import csv
import glob
import os
import re
import sys
import xml.etree.ElementTree as ET
import zipfile

NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"

SOURCE_DIR = (
    r"F:\$$Josh\$$ignatius\$$$$$customers\$$$$$$$$biz-accelerator"
    r"\data-002\Python312"
)

# Free mail and South African consumer ISP domains. An address here is a person,
# not a business, so it fails the "own domain" test.
NOT_OWN_DOMAIN = {
    "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.co.za",
    "hotmail.com", "hotmail.co.za", "hotmail.co.uk", "outlook.com",
    "outlook.co.za", "live.com", "live.co.za", "msn.com", "icloud.com",
    "me.com", "mac.com", "aol.com", "mail.com", "gmx.com", "protonmail.com",
    "zoho.com", "yandex.com",
    # SA ISPs and legacy webmail
    "mweb.co.za", "webmail.co.za", "telkomsa.net", "vodamail.co.za",
    "absamail.co.za", "worldonline.co.za", "iafrica.com", "netactive.co.za",
    "lantic.net", "axxess.co.za", "cybersmart.co.za", "wol.co.za",
    "polka.co.za", "tiscali.co.za", "global.co.za", "saol.com",
    "discoverymail.co.za", "mighty.co.za", "exec.co.za", "intekom.co.za",
    "pixie.co.za", "iburst.co.za", "vodacom.co.za", "mtn.co.za",
    "gowebmail.co.za", "openweb.co.za", "isat.co.za", "hixnet.co.za",
    "3i.co.za", "eject.co.za", "kingsley.co.za", "yebo.co.za",
}

PROVINCES = [
    "Eastern Cape", "Free State", "Gauteng", "Kwazulu-Natal", "KwaZulu-Natal",
    "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape",
]

# The source directory carries a few foreign firms. The email footer states the
# recipient is "listed as a South African business", so these must not go out.
FOREIGN_SUFFIXES = (
    ".uk", ".au", ".nz", ".ie", ".ca", ".in", ".sg", ".zw", ".ke", ".ng",
    ".us", ".de", ".fr", ".nl", ".es", ".it", ".pt", ".br",
)

EMAIL_RE = re.compile(r"^[^@\s,;]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")

# Shared inboxes that are almost always a real business address.
ROLE_PREFIXES = ("info", "admin", "enquiries", "enquiry", "reception", "office",
                 "hello", "contact", "sales", "bookings", "accounts")


def read_sheet(path: str) -> list[list[str]]:
    """Return every row of the first worksheet as a list of cell strings."""
    with zipfile.ZipFile(path) as z:
        names = z.namelist()
        shared: list[str] = []
        if "xl/sharedStrings.xml" in names:
            root = ET.fromstring(z.read("xl/sharedStrings.xml"))
            shared = [
                "".join(t.text or "" for t in si.iter(f"{NS}t"))
                for si in root.findall(f"{NS}si")
            ]
        sheets = sorted(n for n in names if n.startswith("xl/worksheets/sheet"))
        if not sheets:
            return []
        rows = []
        for row in ET.fromstring(z.read(sheets[0])).iter(f"{NS}row"):
            cells = []
            for c in row.findall(f"{NS}c"):
                if c.get("t") == "inlineStr":
                    node = c.find(f"{NS}is")
                    cells.append(
                        "".join(t.text or "" for t in node.iter(f"{NS}t"))
                        if node is not None else ""
                    )
                else:
                    v = c.find(f"{NS}v")
                    val = (v.text or "") if v is not None else ""
                    if c.get("t") == "s" and val != "":
                        val = shared[int(val)]
                    cells.append(val)
            rows.append(cells)
        return rows


def province_of(address: str) -> str:
    for p in PROVINCES:
        if p.lower() in address.lower():
            return "KwaZulu-Natal" if p.lower() == "kwazulu-natal" else p
    return ""


def clean(rows: list[list[str]], source: str,
          require_website: bool = False,
          allow_free_domains: bool = False) -> tuple[list[dict], dict]:
    if not rows:
        return [], {}
    header = [h.strip().lower() for h in rows[0]]
    idx = {name: header.index(name) for name in header}

    def col(row: list[str], name: str) -> str:
        i = idx.get(name)
        return row[i].strip() if i is not None and i < len(row) else ""

    stats = {"raw": 0, "no_email": 0, "bad_email": 0, "foreign": 0,
             "not_own_domain": 0, "no_website": 0, "dupe_domain": 0, "kept": 0}
    seen_domains: set[str] = set()
    seen_emails: set[str] = set()
    out: list[dict] = []

    for row in rows[1:]:
        if not any(c.strip() for c in row):
            continue
        stats["raw"] += 1
        email = col(row, "email").lower()
        if not email:
            stats["no_email"] += 1
            continue
        email = email.split(";")[0].split(",")[0].strip()
        if not EMAIL_RE.match(email):
            stats["bad_email"] += 1
            continue
        domain = email.split("@", 1)[1]
        if domain.endswith(FOREIGN_SUFFIXES):
            stats["foreign"] += 1
            continue
        if domain in NOT_OWN_DOMAIN:
            stats["not_own_domain"] += 1
            if not allow_free_domains:
                continue
        website = col(row, "website")
        if require_website and not website:
            stats["no_website"] += 1
            continue
        free = domain in NOT_OWN_DOMAIN
        if email in seen_emails or (not free and domain in seen_domains):
            stats["dupe_domain"] += 1
            continue
        if not free:
            seen_domains.add(domain)
        seen_emails.add(email)
        address = col(row, "address")
        out.append({
            "email": email,
            "company": col(row, "company name"),
            "category": col(row, "category"),
            "province": province_of(address),
            "phone": col(row, "phone") or col(row, "cell"),
            "website": website,
            "source": source,
        })
        stats["kept"] += 1

    # Role addresses first — they reach the business rather than one employee.
    out.sort(key=lambda r: (not r["email"].startswith(ROLE_PREFIXES),
                            r["company"].lower()))
    return out, stats


def write_batches(rows: list[dict], out_dir: str, size: int = 300) -> None:
    os.makedirs(out_dir, exist_ok=True)
    fields = ["email", "company", "category", "province", "phone", "website",
              "source"]
    manifest = []
    batches = [rows[i:i + size] for i in range(0, len(rows), size)]
    for n, batch in enumerate(batches, 1):
        name = f"batch-{n:02d}.csv"
        with open(os.path.join(out_dir, name), "w", newline="",
                  encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=fields)
            w.writeheader()
            w.writerows(batch)
        manifest.append({
            "file": name,
            "rows": len(batch),
            "own_domain": len(batch),
            "with_website": sum(1 for r in batch if r["website"]),
            "unique_domains": len({r["email"].split("@")[1] for r in batch}),
        })
    with open(os.path.join(out_dir, "_manifest.csv"), "w", newline="",
              encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=["file", "rows", "own_domain",
                                           "with_website", "unique_domains"])
        w.writeheader()
        w.writerows(manifest)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("categories", nargs="+", help="category name(s), no .xlsx")
    ap.add_argument("--out", help="output directory root")
    ap.add_argument("--probe", action="store_true",
                    help="report yield only, write nothing")
    ap.add_argument("--size", type=int, default=300)
    ap.add_argument("--source-dir", default=SOURCE_DIR)
    ap.add_argument("--allow-free-domains", action="store_true",
                    help="keep gmail/ISP addresses. Right for product "
                         "outreach to small owner-run trades; wrong for a "
                         "R20,000 platform pitch")
    ap.add_argument("--require-website", action="store_true",
                    help="drop rows with no website (the directory data is "
                         "patchy, so this is off by default)")
    args = ap.parse_args()

    for category in args.categories:
        path = os.path.join(args.source_dir, f"{category}.xlsx")
        if not os.path.exists(path):
            hits = glob.glob(os.path.join(args.source_dir, f"{category}*.xlsx"))
            if not hits:
                print(f"!! no workbook for {category!r}")
                continue
            path = hits[0]
        rows, stats = clean(read_sheet(path), os.path.basename(path),
                            require_website=args.require_website,
                            allow_free_domains=args.allow_free_domains)
        print(f"\n=== {category} ===")
        print(f"  raw rows        {stats.get('raw', 0):>6,}")
        print(f"  no email        {stats.get('no_email', 0):>6,}")
        print(f"  invalid email   {stats.get('bad_email', 0):>6,}")
        print(f"  foreign domain  {stats.get('foreign', 0):>6,}")
        print(f"  free/ISP domain {stats.get('not_own_domain', 0):>6,}")
        print(f"  no website      {stats.get('no_website', 0):>6,}")
        print(f"  duplicate domain{stats.get('dupe_domain', 0):>6,}")
        print(f"  KEPT            {stats.get('kept', 0):>6,}"
              f"   -> {(stats.get('kept', 0) + args.size - 1)//args.size}"
              f" batches of {args.size}")
        if rows:
            roles = sum(r["email"].startswith(ROLE_PREFIXES) for r in rows)
            sites = sum(1 for r in rows if r["website"])
            print(f"  role addresses  {roles:>6,} "
                  f"({roles * 100 // max(len(rows), 1)}%)")
            free = sum(1 for r in rows
                       if r["email"].split("@")[1] in NOT_OWN_DOMAIN)
            print(f"  with website    {sites:>6,} "
                  f"({sites * 100 // max(len(rows), 1)}%)")
            if free:
                print(f"  free/ISP kept   {free:>6,} "
                      f"({free * 100 // max(len(rows), 1)}%)")
        if not args.probe and args.out:
            slug = re.sub(r"[^a-z0-9]+", "-", category.lower()).strip("-")
            target = os.path.join(args.out, f"phplist-batches-{slug}")
            write_batches(rows, target, args.size)
            print(f"  written -> {target}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
