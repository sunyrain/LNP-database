# Open LNP Source Difference Audit

Generated at: 2026-05-22T19:41:36

## Coverage Status

These are the core open datasets currently integrated locally. This is strong coverage for reusable LNP formulation datasets, but not a proof that every possible open supplementary spreadsheet or repository worldwide has been exhausted.

| source | records | pub_dois | missing_doi_rows | lipids | smiles | sterols |
| --- | --- | --- | --- | --- | --- | --- |
| LNP Atlas | 1092 | 62 | 5 | 39 | 270 | 11 |
| LNPDB | 19797 | 42 | 269 | 13016 | 12845 | 16 |
| Strathclyde ionisable lipid/sterol variation dataset | 394 | 1 | 0 | 14 | 0 | 9 |

## Source Roles

### LNP Atlas

- Record grain: one curated formulation/property row
- Strength: balanced literature metadata, composition, physicochemical properties, SMILES, and bioactivity summaries
- Limitation: smaller corpus; some rows do not carry a normalized DOI
- Top payload types: {"mRNA": 678, "siRNA": 178, "DNA": 135, "empty": 53, "ASO": 36, "gold_nanoparticles": 6, "mRNA, siRNA": 3, "protein": 3}

Group coverage (any field present):

| group | any_fraction | all_fraction |
| --- | --- | --- |
| publication | 1.0 | 0.0 |
| formulation_identity | 1.0 | 0.0 |
| lipid_identity | 1.0 | 0.9368 |
| lipid_structures | 0.9689 | 0.6886 |
| composition | 1.0 | 1.0 |
| payload | 1.0 | 1.0 |
| physicochemical | 0.7482 | 0.1529 |
| bioactivity | 0.8516 | 0.0 |

### LNPDB

- Record grain: one experiment/modeling row from high-throughput and literature datasets
- Strength: largest record count; rich ionizable lipid structural descriptors and bioactivity labels
- Limitation: paper titles/journals absent in source CSV; many records map to a small number of publications
- Top payload types: {"mRNA": 14578, "siRNA": 3758, "pDNA": 1192, "unknown": 269}

Group coverage (any field present):

| group | any_fraction | all_fraction |
| --- | --- | --- |
| publication | 1.0 | 0.0 |
| formulation_identity | 1.0 | 0.9864 |
| lipid_identity | 1.0 | 0.952 |
| lipid_structures | 1.0 | 0.8612 |
| composition | 0.9864 | 0.9864 |
| payload | 0.9864 | 0.9864 |
| physicochemical | 0.0 | 0.0 |
| bioactivity | 0.9864 | 0.9698 |

### Strathclyde ionisable lipid/sterol variation dataset

- Record grain: figure/table row from one focused 2025 study
- Strength: dense paired ionisable-lipid/sterol comparisons with in vitro and in vivo readouts
- Limitation: single-publication dataset; workbook layout requires figure-specific parsing
- Top payload types: {"mRNA": 394}

Group coverage (any field present):

| group | any_fraction | all_fraction |
| --- | --- | --- |
| publication | 1.0 | 0.0 |
| formulation_identity | 0.0 | 0.0 |
| lipid_identity | 1.0 | 0.0 |
| lipid_structures | 0.0 | 0.0 |
| composition | 0.0 | 0.0 |
| payload | 1.0 | 0.1827 |
| physicochemical | 0.3046 | 0.1827 |
| bioactivity | 1.0 | 0.8096 |

## Pairwise Overlap

| left | right | shared_publication_dois | shared_ionizable_lipid_names | shared_ionizable_lipid_smiles |
| --- | --- | --- | --- | --- |
| LNP Atlas | LNPDB | 10 | 7 | 7 |
| LNP Atlas | Strathclyde ionisable lipid/sterol variation dataset | 0 | 1 | 0 |
| LNPDB | Strathclyde ionisable lipid/sterol variation dataset | 0 | 1 | 0 |

## Practical Interpretation

- LNPDB is the largest source by record count and lipid structure coverage.
- LNP Atlas is the best balanced source for formulation/property/publication metadata.
- Strathclyde is a focused single-study matrix that adds sterol-comparison depth rather than broad literature breadth.
- The sources are complementary: they overlap on some landmark papers, but they differ substantially in record grain and field completeness.
