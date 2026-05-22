# High-Throughput Open LNP Dataset Integration

Generated at: 2026-05-22T20:48:14

## Source Record Counts

| source_key | source_dataset | record_role | records | unique_smiles | numeric_activity_rows |
| --- | --- | --- | --- | --- | --- |
| agile | AGILE | experimental_finetuning | 1200 | 1100 | 0 |
| agile | AGILE | experimental_library | 1200 | 1200 | 0 |
| agile | AGILE | virtual_candidate | 12276 | 12276 | 0 |
| comet_lance | COMET / LANCE | formulation_activity | 15867 | 7 | 0 |
| exosome_mimetic_gan | Exosome-mimetic LNP GAN candidates | synthetic_candidate | 10000 | 0 | 0 |
| lipobart | LipoBART iPhos | material_activity | 572 | 572 | 572 |
| lipobart | LipoBART iPhos | material_structure | 572 | 572 | 0 |
| lipobart | LipoBART iPhos | target_definition | 44 | 0 | 0 |
| lnp_ml_lion | LNP_ML / LiON | experimental_delivery | 13069 | 9377 | 13069 |
| lnp_ml_lion | LNP_ML / LiON | experimental_delivery_paper_subset | 13069 | 7493 | 13069 |
| lnp_ml_lion | LNP_ML / LiON | model_prediction | 372 | 165 | 372 |
| lumi_lab | LUMI-lab | design_component_set | 1840 | 0 | 0 |
| lumi_lab | LUMI-lab | experimental_screen | 1920 | 1920 | 1920 |
| translnp | TransLNP | activity_split | 2400 | 1100 | 2400 |
| transma | TransMA | activity_split | 4800 | 1100 | 4800 |

## Source Files

| source_key | source_file | status | records | MB | note |
| --- | --- | --- | --- | --- | --- |
| agile | AGILE_smiles_with_value_group.csv | imported | 1200 | 0.2 | downloaded |
| agile | candidate_set_smiles_plus_features.csv | imported | 12276 | 116.97 | downloaded |
| agile | finetuning_set_smiles_plus_features.csv | imported | 1200 | 11.49 | downloaded |
| comet_lance | experiments/data_json/in_house_lnp_data_overall_lance_without_pbae+caco2_2024-04-16_npratios_foldcaco2label.json | imported | 3028 | 3.91 | downloaded |
| comet_lance | experiments/data_json/in_house_lnp_data_overall_new_full_with_pbae_NPratios_updated_09222023_npratios.json | imported | 3573 | 4.72 | downloaded |
| comet_lance | experiments/data_json/in_house_lnp_data_overall_new_full_without_pbae_NPratios_updated_09222023_npratios.json | imported | 3119 | 4.01 | downloaded |
| comet_lance | experiments/data_json/in_house_lnp_data_overall_new_full_without_pbae_NPratios_updated_09222023_npratios_onlyDC24.json | imported | 3119 | 3.82 | downloaded |
| comet_lance | experiments/data_json/in_house_sslnp_data_overall_lance_without_pbae+p1_lyo_sucrose_2024-03-13_npratios_foldsslabel.json | imported | 3028 | 3.91 | downloaded |
| exosome_mimetic_gan | GAN_generated_Lipiddata_10000.csv | imported | 10000 | 0.43 | downloaded |
| lipobart | data/full_iPhos_lipids.csv | imported | 572 | 0.07 | downloaded |
| lipobart | data/iphos_multiclass.csv | imported | 572 | 0.24 | downloaded |
| lipobart | data/iphos_targets.csv | imported | 44 | 0.0 | downloaded |
| lnp_ml_lion | data/all_data.csv | imported | 13069 | 8.08 | downloaded |
| lnp_ml_lion | data/all_data_for_paper.csv | imported | 13069 | 6.8 | downloaded |
| lnp_ml_lion | results/screen_results/all_amine_split_preds/test_screen/pred_file.csv | imported | 186 | 0.1 | downloaded |
| lnp_ml_lion | results/screen_results/small_test_split_with_ultra_held_out_for_in_silico_screen_preds/test_screen/pred_file.csv | imported | 186 | 0.1 | downloaded |
| lumi_lab | 4CR-1920.csv | imported | 1920 | 0.26 | downloaded |
| lumi_lab | exploitation_components.json | imported | 920 | 0.09 | downloaded |
| lumi_lab | exploration_components.json | imported | 920 | 0.09 | downloaded |
| translnp | dataset/Random/test.csv | imported | 120 | 0.01 | downloaded |
| translnp | dataset/Random/train.csv | imported | 1080 | 0.08 | downloaded |
| translnp | dataset/Scaffold/test.csv | imported | 120 | 0.01 | downloaded |
| translnp | dataset/Scaffold/train.csv | imported | 1080 | 0.08 | downloaded |
| transma | dataset/Hela/cliff/test.csv | imported | 120 | 0.01 | downloaded |
| transma | dataset/Hela/cliff/train.csv | imported | 1080 | 0.08 | downloaded |
| transma | dataset/Hela/scaffold/test.csv | imported | 120 | 0.01 | downloaded |
| transma | dataset/Hela/scaffold/train.csv | imported | 1080 | 0.08 | downloaded |
| transma | dataset/RaW/cliff/test.csv | imported | 120 | 0.01 | downloaded |
| transma | dataset/RaW/cliff/train.csv | imported | 1080 | 0.08 | downloaded |
| transma | dataset/RaW/scaffold/test.csv | imported | 120 | 0.01 | downloaded |
| transma | dataset/RaW/scaffold/train.csv | imported | 1080 | 0.08 | downloaded |

## SMILES Overlap With Existing External Baseline

- Existing integrated external unique ionizable-lipid SMILES: 13108

| source_key | unique_smiles | in_existing_external |
| --- | --- | --- |
| agile | 13154 | 1255 |
| comet_lance | 7 | 0 |
| lipobart | 806 | 65 |
| lnp_ml_lion | 9377 | 1281 |
| lumi_lab | 1920 | 0 |
| translnp | 1100 | 432 |
| transma | 1100 | 432 |

## Literature / Supplement Queue

| priority | source_key | paper_doi | file_name | status |
| --- | --- | --- | --- | --- |
| A_literature_supplement_extraction | a3_coupling_2024 | 10.1186/s12951-024-02919-1 | Supplementary Material 1 PDF | pending |
| A_literature_supplement_extraction | a3_coupling_2024 | 10.1186/s12951-024-02919-1 | Supplementary Material 2 DOCX | pending |
| A_literature_supplement_extraction | brain_targeted_mrna_lnp_2025 | 10.1021/acsnano.4c15013 | Compound spectra .pdf | pending |
| A_literature_supplement_extraction | brain_targeted_mrna_lnp_2025 | 10.1021/acsnano.4c15013 | Published Supporting Information ACS Nano.pdf | pending |
| A_literature_supplement_extraction | kumar_ardekani_2025 | 10.1021/acsabm.4c01716 | mt4c01716_si_001.pdf | pending |
| A_literature_supplement_extraction | natmat_4cr_2024 | 10.1038/s41563-024-01867-3 | Supplementary Information PDF | pending |
| B_literature_supplement_extraction | lumi_lab_suppfigures |  | SupFig_LUMI6-Cl.pdf | pending |
| B_literature_supplement_extraction | lumi_lab_suppfigures |  | SupFig_Top6.pdf | pending |
| B_literature_supplement_extraction | mrna_lnp_manufacturing_2025 | 10.1021/acsnano.5c09800 | nn5c09800_si_001.pdf | pending |
| C_code_only_no_public_training_data | lnp_mod_2025 | 10.1021/acsnano.5c09956 |  | pending |
