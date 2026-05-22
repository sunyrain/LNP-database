# Open High-Throughput LNP Dataset Discovery

Generated at: 2026-05-22T20:14:26

## Executive Status

- Candidate sources audited: 19
- Priority distribution: {'already_integrated': 3, 'A_integrate_next': 3, 'A_literature_supplement_extraction': 4, 'B_literature_supplement_extraction': 2, 'B_audit_overlap': 2, 'B_audit_for_material_layer': 1, 'B_audit_schema_fit': 1, 'C_related_not_core_rna_lnp': 1, 'C_code_only_no_public_training_data': 1, 'C_synthetic_reference': 1}
- Status distribution: {'integrated': 3, 'structured_open_data': 8, 'supplement_pdf_and_embedded_code': 1, 'supplement_pdf_only': 4, 'supplement_pdf_docx': 1, 'large_structured_open_data': 1, 'code_model_no_public_dataset': 1}
- Interpretation: the three previously integrated sources cover the core curated literature databases; several newer high-throughput ML/autonomous-discovery sources still need import adapters or supplementary-table extraction.

## Current Integrated Baseline

| source | records | publication_dois | ionizable_lipids | smiles |
| --- | --- | --- | --- | --- |
| LNPDB | 19797 | 42 | 13016 | 12845 |
| LNP Atlas | 1092 | 62 | 39 | 270 |
| Strathclyde ionisable lipid/sterol variation dataset | 394 | 1 | 14 | 0 |

## Audited Sources

| priority | source | status | structured_files | data_MB | representative | sample |
| --- | --- | --- | --- | --- | --- | --- |
| already_integrated | lnp_atlas | integrated | 1 | 1.79 | LNP_Atlas_DB_202509_v1.csv | lnp_id, ionizable_lipid, peg_lipid, sterol_lipid, helper_lipid, lipid_molar_ratio, particle_size_nm_std, pdi_std, zeta_potential_mv_std, encapsulation_efficiency_percent_std ... (+18) |
| already_integrated | lnpdb | integrated | 394 | 495.49 | data/LNPDB_for_LiON/LNPDB.csv | Index, LNP_ID, Experiment_ID, Formulation_ID, IL_name, IL_SMILES, IL_protonated_SMILES, IL_head_name, IL_head_SMILES, IL_linker_name ... (+30) |
| already_integrated | strathclyde_2025 | integrated | 0 | 0.0 |  |  |
| A_integrate_next | agile | structured_open_data | 4 | 180.75 | AGILE_smiles_with_value_group.csv | id, label, combined_mol_SMILES, A_smiles, B_smiles, C_smiles, expt_Hela, expt_Raw |
| A_literature_supplement_extraction | natmat_4cr_2024 | supplement_pdf_and_embedded_code | 0 | 0.0 | Supplementary Information PDF | not sampled |
| A_integrate_next | lumi_lab | structured_open_data | 4 | 0.46 | 4CR-1920.csv | RLU (log2), mol, Markush code |
| B_literature_supplement_extraction | lumi_lab_suppfigures | supplement_pdf_only | 0 | 1.12 | SupFig_Top6.pdf | not sampled |
| A_integrate_next | comet_lance | structured_open_data | 43 | 53.78 | experiments/data_json/in_house_lnp_data_overall_new_full_without_pbae_NPratios_updated_09222023_npratios.json | sample is not complete JSON; skipped structural summary |
| B_audit_overlap | transma | structured_open_data | 17 | 0.39 | dataset/Hela/scaffold/train.csv | SMILES, TARGET |
| B_audit_overlap | lnp_ml_lion | structured_open_data | 699 | 128.56 | results/screen_results/all_amine_split_preds/test_screen/pred_file.csv | Formulation_ID, Cationic_Lipid_Mass_Ratio, Phospholipid_Mass_Ratio, Cholesterol_Mass_Ratio, PEG_Lipid_Mass_Ratio, Helper_lipid_ID, Amine, Tail, Lipid_name, Library_ID ... (+30) |
| A_literature_supplement_extraction | a3_coupling_2024 | supplement_pdf_docx | 0 | 0.0 | Supplementary Material 1 PDF | not sampled |
| B_audit_for_material_layer | lipobart | structured_open_data | 12 | 35.12 | data/full_iPhos_lipids.csv | , head, tail, combined |
| B_audit_schema_fit | translnp | structured_open_data | 7 | 0.26 | dataset/Scaffold/train.csv | SMILES, TARGET |
| C_related_not_core_rna_lnp | nano_particles_active_learning | large_structured_open_data | 30 | 9850.4 | data/all_samples.csv | ID, PLGA, PP-L, PP-COOH, PP-NH2, S/AS, Uptake, Uptake_stdev, PDI, PDI_stdev ... (+12) |
| A_literature_supplement_extraction | brain_targeted_mrna_lnp_2025 | supplement_pdf_only | 0 | 30.98 | Published Supporting Information ACS Nano.pdf | not sampled |
| C_code_only_no_public_training_data | lnp_mod_2025 | code_model_no_public_dataset | 2 | 0.0 | requirements.txt | # Core ML/DL |
| B_literature_supplement_extraction | mrna_lnp_manufacturing_2025 | supplement_pdf_only | 0 | 35.77 | nn5c09800_si_001.pdf | not sampled |
| A_literature_supplement_extraction | kumar_ardekani_2025 | supplement_pdf_only | 0 | 0.6 | mt4c01716_si_001.pdf | not sampled |
| C_synthetic_reference | exosome_mimetic_gan | structured_open_data | 1 | 0.43 | GAN_generated_Lipiddata_10000.csv | CHOL, SM, PC, PS, PE, Particle size, PDI, Zeta potential |

## Source Notes

### LNP Atlas

- Key: `lnp_atlas`
- Category: curated_literature_database
- Priority/status: already_integrated / integrated
- Reason: Balanced curated formulation/property database with DOI-level provenance.
- Paper DOI: 10.1038/s41597-025-06456-w
- Dataset DOI: 10.5281/zenodo.17243733
- Homepage: https://www.nature.com/articles/s41597-025-06456-w
- Structured files: 1; data files total: 1.79 MB

| platform | path | MB |
| --- | --- | --- |
| Zenodo | LNP_Atlas_DB_202509_v1.csv | 1.79 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| LNP_Atlas_DB_202509_v1.csv | csv | None | lnp_id, ionizable_lipid, peg_lipid, sterol_lipid, helper_lipid, lipid_molar_ratio, particle_size_nm_std, pdi_std, zeta_potential_mv_std, encapsulation_efficiency_percent_std ... (+18) | sample only; full count not downloaded |

### LNPDB / LiON source database

- Key: `lnpdb`
- Category: curated_literature_database
- Priority/status: already_integrated / integrated
- Reason: Largest currently integrated structured LNP table; strong ionizable lipid structure coverage.
- Paper DOI: 10.1038/s41467-026-68818-1
- Dataset DOI: 
- Homepage: https://github.com/evancollins1/LNPDB
- Structured files: 394; data files total: 495.49 MB

| platform | path | MB |
| --- | --- | --- |
| GitHub | data/LNPDB_for_LiON/single_split/fingerprints_all_data.csv | 98.4 |
| GitHub | data/LNPDB_for_LiON/LNPDB.csv | 20.12 |
| GitHub | data/LNPDB_for_AGILE/outputs/LM_2019_heldout_data_plus_features.csv | 13.66 |
| GitHub | data/LNPDB_for_AGILE/outputs/finetuning_set_smiles_plus_features_plus_features.csv | 10.4 |
| GitHub | data/LNPDB_for_AGILE/outputs/BL_2023_heldout_data_plus_features.csv | 9.44 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| data/LNPDB_for_LiON/LNPDB.csv | csv | None | Index, LNP_ID, Experiment_ID, Formulation_ID, IL_name, IL_SMILES, IL_protonated_SMILES, IL_head_name, IL_head_SMILES, IL_linker_name ... (+30) | sample only; full count not downloaded |

### Influence of ionisable lipid and sterol variations on LNP properties and performance

- Key: `strathclyde_2025`
- Category: focused_experimental_workbook
- Priority/status: already_integrated / integrated
- Reason: Focused sterol/ionisable lipid matrix supplied locally and already parsed.
- Paper DOI: 10.1016/j.jconrel.2025.114056
- Dataset DOI: 10.15129/8c088f7e-06f1-45ad-9263-b433e92045ce
- Homepage: https://pureportal.strath.ac.uk/en/datasets/influence-of-ionisable-lipid-and-sterol-variations-on-lipid-nanop/
- Structured files: 0; data files total: 0.0 MB

### AGILE Platform: deep learning-powered acceleration of LNP development for mRNA delivery

- Key: `agile`
- Category: high_throughput_mrna_lnp_ml
- Priority/status: A_integrate_next / structured_open_data
- Reason: Large open candidate and finetuning tables with SMILES/features, plus code repository.
- Paper DOI: 
- Dataset DOI: 10.5281/zenodo.11228093
- Homepage: https://github.com/bowang-lab/AGILE
- Structured files: 4; data files total: 180.75 MB

| platform | path | MB |
| --- | --- | --- |
| Zenodo | candidate_set_smiles_plus_features.csv | 116.97 |
| GitHub | data.zip | 52.1 |
| Zenodo | finetuning_set_smiles_plus_features.csv | 11.49 |
| GitHub | AGILE_smiles_with_value_group.csv | 0.2 |
| GitHub | requirements.txt | 0.0 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| AGILE_smiles_with_value_group.csv | csv | 1200 | id, label, combined_mol_SMILES, A_smiles, B_smiles, C_smiles, expt_Hela, expt_Raw | complete small file |
| candidate_set_smiles_plus_features.csv | csv | None | smiles, desc_ABC/10, desc_ABCGG/10, desc_nBase, desc_SpAbs_A/30, desc_SpMax_A, desc_SpDiam_A, desc_SpAD_A/30, desc_SpMAD_A, desc_LogEE_A ... (+30) | sample only; full count not downloaded |
| finetuning_set_smiles_plus_features.csv | csv | None | smiles, expt_Hela, expt_Raw, desc_ABC/10, desc_ABCGG/10, desc_nBase, desc_SpAbs_A/30, desc_SpMax_A, desc_SpDiam_A, desc_SpAD_A/30 ... (+30) | sample only; full count not downloaded |

### Accelerating ionizable lipid discovery for mRNA delivery using ML and combinatorial chemistry

- Key: `natmat_4cr_2024`
- Category: high_throughput_mrna_lnp_ml_supplement
- Priority/status: A_literature_supplement_extraction / supplement_pdf_and_embedded_code
- Reason: Foundational 4CR screen: 584 experimentally screened ionizable lipids and 40,000 virtual lipids; data/code are stated to be in paper/SI rather than a separate CSV deposit.
- Paper DOI: 10.1038/s41563-024-01867-3
- Dataset DOI: 
- Homepage: https://www.nature.com/articles/s41563-024-01867-3
- Structured files: 0; data files total: 0.0 MB

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| Supplementary Information PDF | unknown |  | not sampled | not sampled |

### LUMI-lab: foundation model-driven autonomous platform for ionizable lipid designs

- Key: `lumi_lab`
- Category: high_throughput_mrna_lnp_ml
- Priority/status: A_integrate_next / structured_open_data
- Reason: Open 4CR-1920 table and component matrices for autonomous ionizable lipid discovery.
- Paper DOI: 
- Dataset DOI: 10.5281/zenodo.17771224
- Homepage: https://zenodo.org/records/17771224
- Structured files: 4; data files total: 0.46 MB

| platform | path | MB |
| --- | --- | --- |
| Zenodo | 4CR-1920.csv | 0.26 |
| Zenodo | exploration_components.json | 0.09 |
| Zenodo | exploitation_components.json | 0.09 |
| Zenodo | qm9_al_ttest_results.xlsx | 0.01 |
| Zenodo | exploitation_data_mtx.npy | 0.01 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| 4CR-1920.csv | csv | 1920 | RLU (log2), mol, Markush code | complete small file |
| exploration_components.json | json_list | 10 |  |  |
| exploitation_components.json | json_list | 10 |  |  |

### LUMI-lab supplementary figure PDFs

- Key: `lumi_lab_suppfigures`
- Category: high_throughput_mrna_lnp_ml_supplement
- Priority/status: B_literature_supplement_extraction / supplement_pdf_only
- Reason: Companion Zenodo deposit contains supplementary figure PDFs for the LUMI-lab study; useful for figure-level validation after structured CSV import.
- Paper DOI: 
- Dataset DOI: 10.5281/zenodo.17771148
- Homepage: https://zenodo.org/records/17771148
- Structured files: 0; data files total: 1.12 MB

| platform | path | MB |
| --- | --- | --- |
| Zenodo | SupFig_Top5.pdf | 0.05 |
| Zenodo | SupFig_Top4.pdf | 0.05 |
| Zenodo | SupFig_LUMI6-Cl.pdf | 0.05 |
| Zenodo | SupFig_Top6.pdf | 0.05 |
| Zenodo | SupFig_Top6 WO bromine.pdf | 0.05 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| SupFig_Top6.pdf | pdf |  | not sampled | not sampled |
| SupFig_LUMI6-Cl.pdf | pdf |  | not sampled | not sampled |

### COMET / LANCE lipid nanoparticle transformer data

- Key: `comet_lance`
- Category: high_throughput_lnp_transformer
- Priority/status: A_integrate_next / structured_open_data
- Reason: Repository contains multi-megabyte LNP JSON datasets and processed splits for transformer training.
- Paper DOI: 
- Dataset DOI: 
- Homepage: https://github.com/alvinchangw/COMET
- Structured files: 43; data files total: 53.78 MB

| platform | path | MB |
| --- | --- | --- |
| GitHub | experiments/in_house_PBAE_lnp_library/demo_in_house_lnp_data_overall_new_full_with_pbae_NPratios_updated_09222023_npratios_09252023gen_fig4cDeployTrain_allastest_lmdb/in_house_lnp/test.json | 5.35 |
| GitHub | experiments/data_json/in_house_lnp_data_overall_new_full_with_pbae_NPratios_updated_09222023_npratios.json | 4.72 |
| GitHub | experiments/in_house_lnp_library/demo_in_house_lnp_data_overall_new_full_without_pbae_NPratios_updated_09222023_npratios_09252023gen_fig3dDeployTrain_allastest_lmdb/in_house_lnp/infer.json | 4.53 |
| GitHub | experiments/in_house_lnp_library/demo_in_house_lnp_data_overall_new_full_without_pbae_NPratios_updated_09222023_npratios_09252023gen_fig3dDeployTrain_allastest_lmdb/in_house_lnp/test.json | 4.53 |
| GitHub | experiments/processed_data_dirs/demo_SSLNP/in_house_sslnp_data_overall_lance_without_pbae+p1_lyo_sucrose_2024-03-13_npratios_foldsslabel_20fixedtestLNPs_LANCELNPtrain100pct_fold_V0/in_house_lnp/train.json | 4.37 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| experiments/data_json/in_house_lnp_data_overall_new_full_without_pbae_NPratios_updated_09222023_npratios.json | json |  | sample is not complete JSON; skipped structural summary | sample is not complete JSON; skipped structural summary |
| experiments/data_json/in_house_lnp_data_overall_new_full_with_pbae_NPratios_updated_09222023_npratios.json | json |  | sample is not complete JSON; skipped structural summary | sample is not complete JSON; skipped structural summary |
| experiments/data_json/in_house_lnp_data_overall_lance_without_pbae+caco2_2024-04-16_npratios_foldcaco2label.json | json |  | sample is not complete JSON; skipped structural summary | sample is not complete JSON; skipped structural summary |

### TransMA: explainable multi-modal model for ionizable lipid nanoparticles in mRNA delivery

- Key: `transma`
- Category: lnp_delivery_activity_ml
- Priority/status: B_audit_overlap / structured_open_data
- Reason: Open HeLa/RAW scaffold and transfection-cliff SMILES/TARGET splits; likely overlaps AGILE/TransLNP and needs deduplication.
- Paper DOI: 10.1093/bib/bbaf307
- Dataset DOI: 10.48550/arXiv.2407.05736
- Homepage: https://github.com/wklix/TransMA
- Structured files: 17; data files total: 0.39 MB

| platform | path | MB |
| --- | --- | --- |
| GitHub | dataset/Hela/scaffold/train.csv | 0.08 |
| GitHub | dataset/Hela/cliff/train.csv | 0.08 |
| GitHub | dataset/RaW/scaffold/train.csv | 0.08 |
| GitHub | dataset/RaW/cliff/train.csv | 0.08 |
| GitHub | models/ChemBERTa-77M-MTR/config.json | 0.02 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| dataset/Hela/scaffold/train.csv | csv | 1080 | SMILES, TARGET | complete small file |
| dataset/RaW/scaffold/train.csv | csv | 1080 | SMILES, TARGET | complete small file |
| dataset/Hela/cliff/train.csv | csv | 1080 | SMILES, TARGET | complete small file |
| dataset/RaW/cliff/train.csv | csv | 1080 | SMILES, TARGET | complete small file |

### LiON / LNP_ML

- Key: `lnp_ml_lion`
- Category: lnp_ml_code_and_splits
- Priority/status: B_audit_overlap / structured_open_data
- Reason: Modeling code/data around LNP optimization; likely overlaps LNPDB and should be deduplicated before import.
- Paper DOI: 
- Dataset DOI: 
- Homepage: https://github.com/jswitten/LNP_ML
- Structured files: 699; data files total: 128.56 MB

| platform | path | MB |
| --- | --- | --- |
| GitHub | data/all_data.csv | 8.08 |
| GitHub | data/all_data_for_paper.csv | 6.8 |
| GitHub | data/crossval_splits/all_amine_split/cv_3/train_metadata.csv | 2.88 |
| GitHub | data/crossval_splits/all_amine_split/cv_2/train_metadata.csv | 2.85 |
| GitHub | data/crossval_splits/all_amine_split/cv_4/train_metadata.csv | 2.79 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| results/screen_results/all_amine_split_preds/test_screen/pred_file.csv | csv | 186 | Formulation_ID, Cationic_Lipid_Mass_Ratio, Phospholipid_Mass_Ratio, Cholesterol_Mass_Ratio, PEG_Lipid_Mass_Ratio, Helper_lipid_ID, Amine, Tail, Lipid_name, Library_ID ... (+30) | complete small file |
| results/screen_results/small_test_split_with_ultra_held_out_for_in_silico_screen_preds/test_screen/pred_file.csv | csv | 186 | Formulation_ID, Cationic_Lipid_Mass_Ratio, Phospholipid_Mass_Ratio, Cholesterol_Mass_Ratio, PEG_Lipid_Mass_Ratio, Helper_lipid_ID, Amine, Tail, Lipid_name, Library_ID ... (+30) | complete small file |

### High-throughput synthesis and optimization of ionizable lipids through A3 coupling for efficient mRNA delivery

- Key: `a3_coupling_2024`
- Category: high_throughput_synthesis_supplement
- Priority/status: A_literature_supplement_extraction / supplement_pdf_docx
- Reason: Recent high-throughput ionizable-lipid synthesis/screening paper; supporting PDF/DOCX contain characterization and screening context but no standalone CSV located.
- Paper DOI: 10.1186/s12951-024-02919-1
- Dataset DOI: 
- Homepage: https://jnanobiotechnology.biomedcentral.com/articles/10.1186/s12951-024-02919-1
- Structured files: 0; data files total: 0.0 MB

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| Supplementary Material 1 PDF | unknown |  | not sampled | not sampled |
| Supplementary Material 2 DOCX | unknown |  | not sampled | not sampled |

### LipoBART iPhos lipid data

- Key: `lipobart`
- Category: ionizable_lipid_structure_activity_ml
- Priority/status: B_audit_for_material_layer / structured_open_data
- Reason: Open ionizable phospholipid tables and fingerprints; stronger material-layer value than formulation-layer value.
- Paper DOI: 
- Dataset DOI: 
- Homepage: https://github.com/Sanofi-Public/LipoBART
- Structured files: 12; data files total: 35.12 MB

| platform | path | MB |
| --- | --- | --- |
| GitHub | data/mol2fp_cfp_all_data.json | 6.24 |
| GitHub | data/mol2fp_CFP.json | 5.94 |
| GitHub | data/mol2fp_MegaMB_finetuned_all_data.json | 5.25 |
| GitHub | data/mol2fp_MMB-FT.json | 5.11 |
| GitHub | data/mol2fp_MegaMB_base_all_data.json | 4.82 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| data/full_iPhos_lipids.csv | csv | 572 | , head, tail, combined | complete small file |
| data/iphos_multiclass.csv | csv | 572 | name, family, y1, y2, p1, p2, p3, p4, m1, m2 ... (+2) | complete small file |
| data/iphos_targets.csv | csv | 44 | , P4, P5, P6, P7, P8, P9, P10, P11, P12 ... (+4) | complete small file |

### TransLNP / TransMA data-balanced transformer datasets

- Key: `translnp`
- Category: lnp_delivery_activity_ml
- Priority/status: B_audit_schema_fit / structured_open_data
- Reason: Small structured delivery/activity splits; useful if fields map cleanly to LNP material/activity schema.
- Paper DOI: 
- Dataset DOI: 
- Homepage: https://github.com/wklix/TransLNP
- Structured files: 7; data files total: 0.26 MB

| platform | path | MB |
| --- | --- | --- |
| GitHub | visual_utils/example.csv | 0.09 |
| GitHub | dataset/Scaffold/train.csv | 0.08 |
| GitHub | dataset/Random/train.csv | 0.08 |
| GitHub | dataset/Random/test.csv | 0.01 |
| GitHub | dataset/Scaffold/test.csv | 0.01 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| dataset/Scaffold/train.csv | csv | 1080 | SMILES, TARGET | complete small file |
| dataset/Scaffold/test.csv | csv | 120 | SMILES, TARGET | complete small file |
| dataset/Random/train.csv | csv | 1080 | SMILES, TARGET | complete small file |
| dataset/Random/test.csv | csv | 120 | SMILES, TARGET | complete small file |

### Machine learning-guided high throughput nanoparticle design

- Key: `nano_particles_active_learning`
- Category: related_nanoparticle_active_learning
- Priority/status: C_related_not_core_rna_lnp / large_structured_open_data
- Reason: Very large active-learning nanoparticle data; include as related HT design source unless nucleic-acid LNP relevance is confirmed.
- Paper DOI: 
- Dataset DOI: 10.5281/zenodo.8289605
- Homepage: https://github.com/molML/Nano_Particles_Active_Learning
- Structured files: 30; data files total: 9850.4 MB

| platform | path | MB |
| --- | --- | --- |
| Zenodo | Ortiz-Perez_2023_all_data.zip | 9794.79 |
| GitHub | results/screen_predictions_0_5Apr.csv | 15.34 |
| GitHub | results/screen_predictions_1_19Apr.csv | 15.31 |
| GitHub | results/screen_predictions_2_24Apr.csv | 15.3 |
| GitHub | data/screen_library.csv | 8.55 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| data/all_samples.csv | csv | 150 | ID, PLGA, PP-L, PP-COOH, PP-NH2, S/AS, Uptake, Uptake_stdev, PDI, PDI_stdev ... (+12) | complete small file |
| data/screen_library.csv | csv | None | PLGA, PP-L, PP-COOH, PP-NH2, S/AS, ID | sample only; full count not downloaded |
| results/screen_predictions_0_5Apr.csv | csv | None | ID, y_hat_uptake, y_uncertainty_uptake, y_hat_uptake_CI05%, y_hat_uptake_CI95%, y_hat_pdi, y_uncertainty_pdi, y_hat_size, y_uncertainty_size, x_PLGA ... (+4) | sample only; full count not downloaded |

### AI-Validated Brain Targeted mRNA Lipid Nanoparticles with Neuronal Tropism

- Key: `brain_targeted_mrna_lnp_2025`
- Category: ai_guided_targeted_mrna_lnp_supplement
- Priority/status: A_literature_supplement_extraction / supplement_pdf_only
- Reason: Recent AI-guided mRNA-LNP targeting study with open Zenodo SI/accepted manuscript/spectra; route to paper/SI extraction rather than direct CSV import.
- Paper DOI: 10.1021/acsnano.4c15013
- Dataset DOI: 10.5281/zenodo.17132384
- Homepage: https://zenodo.org/records/17132384
- Structured files: 0; data files total: 30.98 MB

| platform | path | MB |
| --- | --- | --- |
| Zenodo | movie S3.avi | 9.05 |
| Zenodo | movie S2.avi | 7.08 |
| Zenodo | movie S1.avi | 7.08 |
| Zenodo | 2025 - ACS Nano - AI-Validated Brain Targeted mRNA Lipid - author's accepted version.pdf | 3.24 |
| Zenodo | Compound spectra .pdf | 2.53 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| Published Supporting Information ACS Nano.pdf | pdf |  | not sampled | not sampled |
| Compound spectra .pdf | pdf |  | not sampled | not sampled |

### LNP-MOD: machine-learning assisted morphology/object detection for lipid nanoparticles

- Key: `lnp_mod_2025`
- Category: lnp_morphology_computer_vision
- Priority/status: C_code_only_no_public_training_data / code_model_no_public_dataset
- Reason: Repository provides a cryo-EM analysis pipeline; the ACS paper states training/validation data are available on request, so it is not an open high-throughput database.
- Paper DOI: 10.1021/acsnano.5c09956
- Dataset DOI: 
- Homepage: https://github.com/owenip/LNP_MOD_PUBLIC
- Structured files: 2; data files total: 0.0 MB

| platform | path | MB |
| --- | --- | --- |
| GitHub | requirements.txt | 0.0 |
| GitHub | requirements-dev.txt | 0.0 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| requirements.txt | csv | 32 | # Core ML/DL | complete small file |
| requirements-dev.txt | csv | 17 | # Testing | complete small file |

### Manufacturing mRNA-Loaded Lipid Nanoparticles with Precise Size and Morphology Control

- Key: `mrna_lnp_manufacturing_2025`
- Category: process_development_supplement
- Priority/status: B_literature_supplement_extraction / supplement_pdf_only
- Reason: Recent mRNA-LNP process/morphology paper with a large ACS supporting-information PDF; no separate structured data deposit found.
- Paper DOI: 10.1021/acsnano.5c09800
- Dataset DOI: 
- Homepage: https://pubs.acs.org/doi/10.1021/acsnano.5c09800
- Structured files: 0; data files total: 35.77 MB

| platform | path | MB |
| --- | --- | --- |
| ACS | nn5c09800_si_001.pdf | 35.77 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| nn5c09800_si_001.pdf | pdf |  | not sampled | not sampled |

### Machine-learning framework to predict LNP performance for nucleic acid delivery

- Key: `kumar_ardekani_2025`
- Category: supplementary_pdf_curated_dataset
- Priority/status: A_literature_supplement_extraction / supplement_pdf_only
- Reason: Claims 6454 curated formulations across 21 studies, but Figshare exposes only a supplementary PDF; route through literature/SI extraction.
- Paper DOI: 10.1021/acsabm.4c01716
- Dataset DOI: 10.1021/acsabm.4c01716.s001
- Homepage: https://acs.figshare.com/articles/journal_contribution/Machine-Learning_Framework_to_Predict_the_Performance_of_Lipid_Nanoparticles_for_Nucleic_Acid_Delivery/28851323
- Structured files: 0; data files total: 0.6 MB

| platform | path | MB |
| --- | --- | --- |
| Figshare | mt4c01716_si_001.pdf | 0.6 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| mt4c01716_si_001.pdf | pdf |  | not sampled | not sampled |

### Machine learning-driven rational design of exosome-mimetic lipid nanoparticles for cancer therapy

- Key: `exosome_mimetic_gan`
- Category: synthetic_generated_lnp_candidates
- Priority/status: C_synthetic_reference / structured_open_data
- Reason: GAN-generated 10,000-row lipid candidate file; useful as synthetic candidate/reference data, not primary experimental evidence.
- Paper DOI: 
- Dataset DOI: 10.5281/zenodo.16928013
- Homepage: https://zenodo.org/records/16928013
- Structured files: 1; data files total: 0.43 MB

| platform | path | MB |
| --- | --- | --- |
| Zenodo | GAN_generated_Lipiddata_10000.csv | 0.43 |

Representative file samples:

| file | format | rows | columns | note |
| --- | --- | --- | --- | --- |
| GAN_generated_Lipiddata_10000.csv | csv | 10000 | CHOL, SM, PC, PS, PE, Particle size, PDI, Zeta potential | complete small file |

## Recommended Next Import Order

1. Import AGILE Zenodo/GitHub tables into a material/ML candidate layer, keeping finetuning rows separate from virtual candidate rows.
2. Import LUMI-lab 4CR/component data into the ionizable-lipid design layer and preserve exploration/exploitation labels.
3. Import COMET/LANCE JSON into a high-throughput formulation/activity layer after normalizing JSON record shape.
4. Audit LiON/LNP_ML against the already integrated LNPDB before importing to avoid duplicated records.
5. Route the Kumar/Ardekani ACS Figshare item through supplementary PDF table extraction; it is not a ready CSV/XLSX database.
6. Keep nanoparticle active-learning and GAN-generated datasets as related references unless formulation/payload fields confirm core RNA-LNP applicability.
