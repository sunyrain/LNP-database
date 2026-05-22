# High-Throughput LNP Dataset Audit

Generated at: 2026-05-22T20:52:30

## Normalized Counts

- High-throughput records: 79201
- Activity values: 97031
- Component rows: 156420

## By Source

| source_key | record_role | records | unique_ionizable_smiles | activity_metrics | numeric_activity_values | unique_component_smiles |
| --- | --- | --- | --- | --- | --- | --- |
| agile | experimental_finetuning | 2400 | 1100 | 2 | 2400 | 1100 |
| agile | experimental_library | 9600 | 1200 | 2 | 9600 | 1237 |
| agile | virtual_candidate | 12276 | 12276 | 0 | 0 | 12276 |
| comet_lance | formulation_activity | 127771 | 7 | 4 | 127771 | 22 |
| exosome_mimetic_gan | synthetic_candidate | 10000 | 0 | 0 | 0 | 0 |
| lipobart | material_activity | 18304 | 572 | 4 | 18304 | 575 |
| lipobart | material_structure | 1716 | 572 | 0 | 0 | 613 |
| lipobart | target_definition | 616 | 0 | 14 | 572 | 0 |
| lnp_ml_lion | experimental_delivery | 52132 | 9377 | 2 | 52132 | 9381 |
| lnp_ml_lion | experimental_delivery_paper_subset | 41995 | 7493 | 2 | 41995 | 7497 |
| lnp_ml_lion | model_prediction | 2232 | 165 | 6 | 2232 | 165 |
| lumi_lab | design_component_set | 7360 | 0 | 0 | 0 | 96 |
| lumi_lab | experimental_screen | 1920 | 1920 | 1 | 1920 | 1920 |
| translnp | activity_split | 2400 | 1100 | 1 | 2400 | 1100 |
| transma | activity_split | 4800 | 1100 | 1 | 4800 | 1100 |

## Overlap With Existing Core External Data

- Core external unique ionizable-lipid SMILES: 13108

| source_key | unique_smiles | in_existing |
| --- | --- | --- |
| agile | 13154 | 1255 |
| comet_lance | 7 | 0 |
| lipobart | 806 | 65 |
| lnp_ml_lion | 9377 | 1281 |
| lumi_lab | 1920 | 0 |
| translnp | 1100 | 432 |
| transma | 1100 | 432 |

## Pairwise High-Throughput SMILES Overlap

| left | right | left_smiles | right_smiles | shared_smiles |
| --- | --- | --- | --- | --- |
| agile | translnp | 13154 | 1100 | 1100 |
| agile | transma | 13154 | 1100 | 1100 |
| translnp | transma | 1100 | 1100 | 1100 |
| agile | comet_lance | 13154 | 7 | 0 |
| agile | lipobart | 13154 | 806 | 0 |
| agile | lnp_ml_lion | 13154 | 9377 | 0 |
| agile | lumi_lab | 13154 | 1920 | 0 |
| comet_lance | lipobart | 7 | 806 | 0 |
| comet_lance | lnp_ml_lion | 7 | 9377 | 0 |
| comet_lance | lumi_lab | 7 | 1920 | 0 |
| comet_lance | translnp | 7 | 1100 | 0 |
| comet_lance | transma | 7 | 1100 | 0 |
| lipobart | lnp_ml_lion | 806 | 9377 | 0 |
| lipobart | lumi_lab | 806 | 1920 | 0 |
| lipobart | translnp | 806 | 1100 | 0 |
| lipobart | transma | 806 | 1100 | 0 |
| lnp_ml_lion | lumi_lab | 9377 | 1920 | 0 |
| lnp_ml_lion | translnp | 9377 | 1100 | 0 |
| lnp_ml_lion | transma | 9377 | 1100 | 0 |
| lumi_lab | translnp | 1920 | 1100 | 0 |

## Activity Metrics

| source_key | record_role | metric | rows | numeric_rows | min_value | max_value | avg_value |
| --- | --- | --- | --- | --- | --- | --- | --- |
| agile | experimental_finetuning | expt_Raw | 1200 | 1200 | -2.5307831 | 11.4112837 | 2.177283039416667 |
| agile | experimental_finetuning | expt_Hela | 1200 | 1200 | -2.345629161 | 15.9596558 | 4.845546808890004 |
| agile | experimental_library | expt_Raw | 1200 | 1200 | -2.530783132 | 11.41128373 | 2.175360913852499 |
| agile | experimental_library | expt_Hela | 1200 | 1200 | -2.3456292 | 15.9596558 | 4.850145813024998 |
| comet_lance | formulation_activity | in_house_lnp_DC24_luc | 15867 | 15867 | 0.0 | 1.0 | 0.47336747390913786 |
| comet_lance | formulation_activity | in_house_lnp_B16F10_luc | 12748 | 12748 | 0.0 | 1.0 | 0.35771317872189184 |
| comet_lance | formulation_activity | in_house_lnp_CACO2_luc | 295 | 295 | 0.0 | 1.0 | 0.5591766487564597 |
| comet_lance | formulation_activity | SSLNP_in_house_lnp_B16F10_luc | 168 | 168 | 0.0 | 1.0 | 0.3279703800228686 |
| lipobart | material_activity | y2 | 572 | 572 | 0.0 | 1.0 | 0.1555944055944056 |
| lipobart | material_activity | y1 | 572 | 572 | 0.0 | 3.0 | 0.8479020979020979 |
| lipobart | material_activity | family;y1;y2 | 572 | 572 | 0.0 | 6.0 | 2.7045454545454546 |
| lipobart | material_activity | family | 572 | 572 | 0.0 | 6.0 | 2.7045454545454546 |
| lipobart | target_definition | Unnamed: 0 | 44 | 0 | None | None | None |
| lipobart | target_definition | P9 | 44 | 44 | 0.0 | 3.0 | 1.3863636363636365 |
| lipobart | target_definition | P8 | 44 | 44 | 0.0 | 2.0 | 0.7727272727272727 |
| lipobart | target_definition | P7 | 44 | 44 | 0.0 | 2.0 | 0.8863636363636364 |
| lipobart | target_definition | P6 | 44 | 44 | 0.0 | 2.0 | 0.75 |
| lipobart | target_definition | P5 | 44 | 44 | 0.0 | 2.0 | 0.5227272727272727 |
| lipobart | target_definition | P4 | 44 | 44 | 0.0 | 2.0 | 0.9318181818181818 |
| lipobart | target_definition | P16 | 44 | 44 | 0.0 | 3.0 | 0.5 |
| lipobart | target_definition | P15 | 44 | 44 | 0.0 | 3.0 | 0.6136363636363636 |
| lipobart | target_definition | P14 | 44 | 44 | 0.0 | 3.0 | 0.7727272727272727 |
| lipobart | target_definition | P13 | 44 | 44 | 0.0 | 3.0 | 0.7954545454545454 |
| lipobart | target_definition | P12 | 44 | 44 | 0.0 | 2.0 | 0.8636363636363636 |
| lipobart | target_definition | P11 | 44 | 44 | 0.0 | 3.0 | 0.9545454545454546 |
| lipobart | target_definition | P10 | 44 | 44 | 0.0 | 3.0 | 1.2727272727272727 |
| lnp_ml_lion | experimental_delivery | unnormalized_delivery | 13069 | 13069 | -3.220623659 | 37800.0 | 32.41406874485428 |
| lnp_ml_lion | experimental_delivery | quantified_delivery | 13069 | 13069 | -3.156676774262336 | 7.223938424120641 | -3.869002787782396e-16 |
| lnp_ml_lion | experimental_delivery_paper_subset | quantified_delivery | 13069 | 13069 | -3.156676774 | 7.223938424 | 5.202706372818167e-12 |
| lnp_ml_lion | experimental_delivery_paper_subset | unnormalized_delivery | 9690 | 9690 | -3.220623659 | 11.5903614 | 2.018469485968247 |
| lnp_ml_lion | model_prediction | cv_4_pred_delivery | 372 | 372 | -1.10550629055687 | 1.7582108277501451 | 0.1778402425259342 |
| lnp_ml_lion | model_prediction | cv_3_pred_delivery | 372 | 372 | -1.0209740099356572 | 1.8869931206821409 | 0.2013842452463017 |
| lnp_ml_lion | model_prediction | cv_2_pred_delivery | 372 | 372 | -1.2513114436246848 | 2.23881819203543 | 0.14816948950372058 |
| lnp_ml_lion | model_prediction | cv_1_pred_delivery | 372 | 372 | -1.0925197064580416 | 1.4197203267618028 | 0.15280770424424756 |
| lnp_ml_lion | model_prediction | cv_0_pred_delivery | 372 | 372 | -1.2319483586094384 | 1.9316905263238464 | 0.1869279721376793 |
| lnp_ml_lion | model_prediction | avg_pred_delivery | 372 | 372 | -0.8896677609136127 | 1.7646619856270758 | 0.1734259307315765 |
| lumi_lab | experimental_screen | RLU_log2 | 1920 | 1920 | -5.523561956 | 16.21709132 | 4.128139653055197 |
| translnp | activity_split | TARGET | 2400 | 2400 | -2.345629161 | 15.9596558 | 4.845546808890001 |
| transma | activity_split | TARGET | 4800 | 4800 | -2.5307831 | 15.9596558 | 3.511414924153354 |

## Component Coverage

| source_key | record_role | component_type | rows | unique_smiles |
| --- | --- | --- | --- | --- |
| agile | experimental_finetuning | IL | 1200 | 1100 |
| agile | experimental_library | A_smiles | 1200 | 20 |
| agile | experimental_library | B_smiles | 1200 | 12 |
| agile | experimental_library | C_smiles | 1200 | 5 |
| agile | experimental_library | IL | 1200 | 1200 |
| agile | virtual_candidate | IL | 12276 | 12276 |
| comet_lance | formulation_activity | CH | 15867 | 3 |
| comet_lance | formulation_activity | HL | 15867 | 2 |
| comet_lance | formulation_activity | IL | 21117 | 7 |
| comet_lance | formulation_activity | PBAE_branching_agent | 454 | 3 |
| comet_lance | formulation_activity | PBAE_monomer | 454 | 5 |
| comet_lance | formulation_activity | PEG | 15867 | 2 |
| lipobart | material_activity | CH | 572 | 1 |
| lipobart | material_activity | HL | 572 | 1 |
| lipobart | material_activity | IL | 572 | 572 |
| lipobart | material_activity | PEG | 572 | 1 |
| lipobart | material_activity | m1 | 572 | 572 |
| lipobart | material_activity | m2 | 572 | 1 |
| lipobart | material_activity | m3 | 572 | 1 |
| lipobart | material_activity | m4 | 572 | 1 |
| lipobart | material_structure | IL | 572 | 572 |
| lipobart | material_structure | head | 572 | 13 |
| lipobart | material_structure | tail | 572 | 28 |
| lnp_ml_lion | experimental_delivery | HL | 12997 | 4 |
| lnp_ml_lion | experimental_delivery | IL | 13069 | 9377 |
| lnp_ml_lion | experimental_delivery_paper_subset | HL | 9618 | 4 |
| lnp_ml_lion | experimental_delivery_paper_subset | IL | 9690 | 7493 |
| lnp_ml_lion | model_prediction | IL | 372 | 165 |
| lumi_lab | design_component_set | amines | 1840 | 32 |
| lumi_lab | design_component_set | isocyanide | 1840 | 12 |
| lumi_lab | design_component_set | lipid_aldehyde | 1840 | 16 |
| lumi_lab | design_component_set | lipid_carboxylic_acid | 1840 | 36 |
| lumi_lab | experimental_screen | IL | 1920 | 1920 |
| translnp | activity_split | IL | 2400 | 1100 |
| transma | activity_split | IL | 4800 | 1100 |
