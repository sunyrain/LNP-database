# LNP Open Data Atlas 项目说明

本文档用于介绍 LNP Open Data Atlas 的建设背景、数据范围、页面结构和后续分析方向。它面向希望快速理解项目价值的读者：既包括 RNA 药物、纳米递送和药剂学方向的研究者，也包括准备使用这些公开数据做机器学习建模、文献抽取或数据治理的开发者。

需要先说明边界：本项目关注的是公开 LNP 数据的整理、审计、可视化和建模准备度分析，不提供实验操作流程、制备参数、临床用药建议或未经验证的药物开发结论。文档中的数字来自当前静态站点构建结果；随着后续开源数据和文献补充材料继续接入，统计值会更新。

截至 2026-05-23，本项目已经完成第一批国际开源 LNP 数据的整合、用途分块、来源审计、mRNA 递送子集筛选、物化性质子集整理，以及基于分子表征的初步机器学习可建模性分析。这个版本的核心目标不是给出最终模型，而是回答一个更基础的问题：现有公开数据能支持哪些可靠分析，哪些地方还需要继续补充和标准化。

## 1. 背景：LNP 是什么，为什么重要

LNP 是 lipid nanoparticle，即脂质纳米颗粒。它是一类由脂质材料自组装形成的纳米级递送系统，常用于把核酸类药物或疫苗递送到细胞内。对于 mRNA、siRNA、gRNA、pDNA 等核酸载荷来说，递送系统非常关键：裸露的核酸分子通常稳定性有限，带有负电荷，不容易直接穿过细胞膜，也容易受到体内核酸酶降解。LNP 的核心作用是把这些核酸载荷保护起来，并帮助它们进入目标细胞。

在现代 RNA 药物和疫苗中，LNP 已经成为最重要的非病毒递送平台之一。2018 年获批的 patisiran / Onpattro 是 RNAi 药物和 LNP 递送的重要里程碑；COVID-19 mRNA 疫苗则让 LNP-mRNA 体系进入大规模临床和公共卫生应用。FDA 也将脂质体和 LNP 这类脂质制剂视为复杂药物递送系统的一类，应用范围包括疫苗、肿瘤、免疫治疗和其他复杂药物产品。相关综述也指出，LNP 已经成为核酸疫苗和核酸治疗药物发展的关键 enabling technology。

需要注意的是，LNP 不是单一分子，而是一个多组分系统。典型 LNP 通常包含：

- **可电离脂质**：在特定环境下带正电，帮助结合带负电的核酸，并影响内涵体逃逸。
- **辅助脂质**：调节膜结构、相行为和细胞内释放。
- **胆固醇或甾醇类组分**：调节颗粒稳定性和膜流动性。
- **PEG 脂质**：影响颗粒大小、分散性、循环稳定性和蛋白吸附。
- **核酸载荷**：例如 mRNA、siRNA、gRNA、pDNA 或其他核酸类型。

因此，LNP 的性能不是由某一个分子单独决定，而是由脂质结构、组分比例、核酸载荷、颗粒物化性质、给药途径、细胞或组织环境、实验 readout 和制备条件共同决定。这也是 LNP 数据整理和建模难度较高的根本原因。

## 2. LNP 和 mRNA 的关系

mRNA 药物或疫苗的核心思想是把一段编码信息递送到细胞内，让细胞暂时表达目标蛋白。这个目标蛋白可以是疫苗抗原、治疗性蛋白，也可以是基因编辑系统中的 Cas 蛋白等。mRNA 本身承担的是“信息载荷”的角色，而 LNP 承担的是“递送载体”的角色。

两者的关系可以概括为：

```text
mRNA 提供编码信息
LNP 保护 mRNA 并帮助其进入细胞
细胞翻译 mRNA 产生蛋白
蛋白产生免疫、替代、编辑或其他治疗效果
```

LNP-mRNA 系统的优势在于平台化程度高。理论上，mRNA 序列可以更换，LNP 递送体系可以作为相对通用的平台继续优化。但在实际应用中，不同 mRNA 长度、修饰、纯度、剂量、组织靶向需求和给药方式都会影响 LNP 设计。因此，mRNA 递送并不是“有一个通用 LNP 就够了”，而是需要针对不同应用持续优化。

本项目中的 **mRNA 递送子集** 正是围绕这个问题建立的：从公开 LNP 数据中筛出与 mRNA 载荷相关的记录，并尽量保留 payload、route、cell/tissue、readout 等上下文，避免把不同核酸类型和实验体系混成一个不可解释的标签。

## 3. 领域内现在主要关注什么

LNP 领域目前关注点大致可以分为七类。

### 3.1 递送效率和表达强度

最直接的问题是：给定一个 LNP 配方，它能否把 mRNA 或其他核酸有效递送到细胞内，并产生足够表达或功能输出。常见 readout 包括荧光、发光、蛋白表达量、基因编辑效率、沉默效率等。

问题在于，不同论文的 readout 并不等价。体外细胞转染、动物体内 luciferase 表达、器官分布、编辑效率和毒性指标都不能简单合并为一个“活性”。这也是本站把 activity 拆成不同用途分块和任务基线的原因。

### 3.2 组织靶向和递送语境

LNP 递送常常存在组织偏向。例如肝脏递送相对成熟，而肺、脾、淋巴结、肿瘤、免疫细胞、中枢神经系统等场景更具挑战。领域内非常关注如何改变脂质结构、配方组成、表面性质或给药路径，使 LNP 更倾向于进入特定组织或细胞类型。

因此，给药途径、器官/组织、细胞类型和 assay system 不是附属字段，而是建模时必须保留的上下文。

### 3.3 内涵体逃逸

核酸进入细胞后，通常会经历内吞途径。如果载荷停留在内涵体或溶酶体中，不能释放到胞质，就难以发挥作用。可电离脂质的 pKa、头基结构、疏水尾链、可降解连接键和整体颗粒结构都会影响内涵体逃逸。

这也是为什么很多高通量 LNP 数据集重点围绕 **ionizable lipid design** 展开：可电离脂质往往是决定递送性能的核心变量之一。

### 3.4 物化性质和质量控制

LNP 不是只有“活性”一个指标。粒径、PDI、zeta potential、包封率、形貌、稳定性、批间一致性等物化性质同样重要。它们影响储存、给药、体内分布、免疫反应和可制造性。

本站将 **物化性质建模** 单独作为用途分块，是因为这些标签更接近制剂质量和制造条件，不能简单混入递送活性任务中。

### 3.5 安全性和耐受性

LNP 作为递送载体，也可能带来炎症、免疫刺激、补体激活、肝脾摄取、局部反应等问题。不同给药途径和剂量下的安全性差异较大。对新脂质和新配方而言，递送效率高并不意味着整体可用，还必须考虑安全窗口。

公开数据中安全性字段往往不如活性字段标准化，这也是后续文献提取需要加强的方向。

### 3.6 可制造性和工艺放大

从实验室筛选到药物开发，LNP 还要面对制造和放大问题。粒径控制、混合方式、批间稳定性、储存条件、过滤、冻融和长期稳定性都会影响最终产品。FDA 也关注脂质体和 LNP 等复杂制剂的连续制造、过程监控和质量控制。

因此，数据整理不应只关心结构和活性，还要尽量记录 formulation method、process metadata 和 particle quality readouts。

### 3.7 数据驱动设计和机器学习

近年来，LNP 领域开始出现越来越多的数据库、机器学习模型和生成式设计工作。典型目标包括：

- 从已知脂质结构预测递送性能。
- 根据配方组分和比例预测物化性质。
- 识别高性能结构族或可迁移的设计规则。
- 发现已有数据空间中的空白区域。
- 用主动学习指导下一轮实验筛选。
- 生成可合成的新型可电离脂质候选。

但机器学习的瓶颈很明显：公开数据分散、字段不统一、标签异质性强、训练/测试集容易发生结构泄漏，且很多记录缺少完整配方和实验语境。因此，数据治理和标准化是建模之前必须完成的步骤。

## 4. 为什么需要 LNP Open Data Atlas

LNP 领域的数据正在快速增加，但这些数据常常分散在论文正文、补充表格、图像、GitHub、Zenodo、实验室网站和已发布数据库中。不同数据源之间存在明显差异：

- 有的数据重配方，有的数据重可电离脂质结构。
- 有的数据是体外筛选，有的数据是动物实验。
- 有的数据包含完整配方比例，有的数据只有 ionizable lipid SMILES。
- 有的数据记录 mRNA 递送，有的数据记录 siRNA、pDNA 或其他核酸。
- 有的数据提供真实实验值，有的数据是模型预测或虚拟候选。
- 不同数据源之间还可能共享相同或高度相似的脂质结构，导致训练/测试泄漏。

LNP Open Data Atlas 的目标不是把所有行简单拼接，而是把公开数据整理成一个**可浏览、可审计、可建模**的数据图谱。它希望回答：

1. 当前公开 LNP 数据到底有哪些？
2. 每个数据源贡献了什么类型的信息？
3. 哪些记录适合做配方检索？
4. 哪些记录适合做结构-活性建模？
5. 哪些记录属于 mRNA 递送子集？
6. 哪些记录包含物化性质和质量 readout？
7. 当前数据是否足够支持机器学习？
8. 哪些来源之间可能存在重复或泄漏？
9. 下一步文献提取应该优先补哪些信息？

## 5. 当前网站包含什么

当前静态网站整合了公开 LNP 数据，并生成了展示页面、分析详情页、数据路线页和治理审计页。

截至当前构建，静态展示资产包含：

- **整合记录**：100,484 条。
- **核心开源记录**：21,283 条。
- **高通量记录**：79,201 条。
- **数值活性值**：97,031 个。
- **标准化组分行**：156,420 行。
- **来源文件**：31 个。
- **exact unique ionizable SMILES**：35,771 个。

这些数字来自当前站点构建时的静态数据资产。它们是展示与分析层的统计结果，不等同于最终去重后的药物候选数量。

## 6. 四个页面分别是什么

### 6.1 展示首页

展示首页是面向外部读者的入口页面，重点说明这个网站是什么、数据大致有哪些、可以支持哪些分析。它不再堆叠大表格和所有审计结果，而是用叙事方式展示：

- LNP Open Data Atlas 的定位。
- 整合记录数、mRNA 子集、结构-活性记录、物化性质记录。
- 数据资产类型：配方、结构、mRNA 递送、物化质量。
- 从公开数据到可建模任务的处理流程。
- 当前深度学习模块的定位和边界。

### 6.2 分析详情

分析详情页保留原来的工作台功能，适合深入检查数据。它包含：

- 用途分块。
- 深度学习分析。
- 表征空间图。
- ChemBERTa 与 RDKit 描述符基线。
- 特征覆盖。
- 验证风险。
- 来源贡献。
- 建模准备度。
- 来源清单。
- 活性指标。
- 记录预览。

这个页面面向项目内部分析、数据审计和建模准备。

### 6.3 数据路线

数据路线页解释数据该如何处理，重点不是展示结果，而是说明工程和科学逻辑：

- 为什么不能直接合并训练。
- 如何做 canonical lipid entity。
- 如何区分 formulation row、lipid entity、assay label、source file 和 publication。
- 如何拆分任务族。
- 如何构建 mRNA-only 数据表。
- 如何为后续文献提取建立 schema。

### 6.4 治理审计

治理审计页放置更偏运维和质量控制的内容，包括：

- 来源重叠。
- 潜在训练/测试泄漏。
- 文献补充材料提取队列。
- 下一批 GitHub、Zenodo、supplementary data 的处理优先级。

这些信息对数据库可靠性很重要，但不适合放在展示首页。

## 7. 当前数据用途分块

本站把数据按用途拆成多个分析块，而不是把所有记录视为同一种数据。

### 7.1 配方检索与来源登记

这是全量整合记录视图，适合做来源追溯、配方比较、载荷筛选和来源覆盖检查。这个视图强调 provenance，即每条记录来自哪里、原始语境是什么。

### 7.2 结构-活性建模

结构-活性建模关注含有可电离脂质结构和数值活性标签的记录。当前这一分块包含 51,090 条记录。它适合做监督学习，但必须注意：

- 不同来源的 assay 不一定可比。
- 同一结构族可能跨数据源重复出现。
- 随机切分容易高估模型性能。
- 应优先使用 scaffold holdout 或 source-family holdout。

### 7.3 mRNA 递送子集

mRNA 递送子集包含载荷标签与 mRNA 相关的记录。当前这一分块包含 56,787 条记录。它最贴近本项目目标，但仍需要进一步标准化：

- mRNA payload 类型。
- 细胞或组织背景。
- 给药途径。
- readout 类型。
- 剂量和时间点。
- 来源切分字段。

### 7.4 物化性质建模

物化性质分块包含粒径、PDI、zeta、包封率等 readout。当前这一分块包含 937 条记录。它们适合做配方质量、稳定性和可制造性方向的分析，但要先统一单位和实验条件。

### 7.5 组分与配方空间

组分与配方空间关注 LNP 的完整组成，包括 ionizable lipid、helper lipid、sterol、PEG lipid 以及比例字段。当前已有 65,778 条记录可表示为标准化组分行。这个分块适合做：

- 组分共现分析。
- 脂质类型覆盖分析。
- 配方相似性。
- formulation embedding。
- 数据空间空白区域识别。

### 7.6 给药途径、细胞与靶向语境

这个分块关注 route、target、cell context 等实验语境。当前包含 27,931 条高通量相关记录。它适合做分层分析，而不适合直接混成一个单一标签空间。

## 8. 深度学习部分现在做了什么

当前深度学习模块的定位是**数据可建模性检查**，不是最终的 LNP 递送预测器。

目前已经完成：

- 下载并使用 `DeepChem/ChemBERTa-77M-MLM` 作为冻结分子编码器。
- 对 27,250 个 canonical ionizable-lipid SMILES 生成 384 维分子表征。
- 用 PCA 生成表征空间图。
- 对表征空间做聚类和来源覆盖分析。
- 对若干数值活性任务做 ChemBERTa embedding + 梯度提升回归基线。
- 用 RDKit 描述符作为传统基线对照。
- 使用 scaffold-aware holdout 进行训练/测试切分。
- 检查跨来源近邻和潜在重复结构。

其中“描述符与深度表征对照”的 **6 个基线任务** 指的是 6 个监督学习任务，不是 6 条记录或 6 个分子。它用于比较传统 RDKit 描述符和 ChemBERTa 深度表征在不同任务上的表现。

当前模型表现不应被解读为最终性能，因为它只使用 ionizable lipid 结构，而真实 LNP 递送还受到完整配方、比例、粒径、载荷、给药途径、细胞/组织和实验 readout 的强烈影响。

## 9. 为什么当前模型结果看起来不高

这不是简单模型“失败”，而是反映了 LNP 数据本身的难度。

主要原因包括：

1. **输入信息不完整**  
   当前模型主要使用 ionizable lipid SMILES，而没有完整纳入 helper lipid、sterol、PEG lipid、比例、粒径、PDI、zeta、payload、route、cell 和 readout。

2. **标签异质性强**  
   RLU、quantified delivery、TARGET、材料活性等标签来自不同实验体系，不能简单视为同一种活性。

3. **切分方式更严格**  
   当前监督基线优先使用 scaffold holdout，测试集包含训练集中没有出现过的结构骨架，比随机切分更接近外推场景。

4. **来源重叠和数据泄漏风险存在**  
   多个公开数据源可能共享相同或相近结构。如果不做审计，模型可能学到数据来源或重复结构，而不是可泛化的结构-功能关系。

5. **LNP 是配方系统，不是单分子任务**  
   单个脂质结构只能解释部分性能。真正的 SOTA 模型通常需要 formulation-level、context-aware 和 multi-task 设计。

因此，当前基线的价值在于告诉我们：哪些任务有信号、哪些任务需要更多上下文、哪些来源可能存在泄漏、哪些数据适合后续建模。

## 10. 这个网站不是什么

为了避免误解，需要明确：

- 这不是实验操作手册。
- 这不是 LNP 制备配方库。
- 这不是临床用药建议。
- 这不是最终的 mRNA 递送预测模型。
- 这不是经过完全去重和外部验证的药物发现平台。

它目前是一个公开数据图谱和建模准备度分析网站，目标是帮助研究者理解数据、审计来源、拆分任务，并为后续文献提取和机器学习建模打基础。

## 11. 后续计划

下一阶段可以沿着以下方向继续推进：

1. 建立稳定的 lipid entity 表，对 ionizable/helper/sterol/PEG 脂质统一实体 ID。
2. 建立 deduplicated formulation view，同时保留 source-specific row view。
3. 构建 mRNA-only v0 数据集，统一 payload、route、cell/tissue、readout 和 source split。
4. 将物化性质 readout 单独规范化，优先整理 size、PDI、zeta、encapsulation。
5. 对高通量论文补充材料、GitHub 和 Zenodo 数据继续做结构化提取。
6. 建立外部验证集，避免模型只在重复结构或相近来源上表现好。
7. 从 molecule-level 模型升级到 formulation-level 多模态模型。
8. 加入 uncertainty、applicability domain 和 active-learning 视图。

## 12. 推荐阅读与参考来源

以下资料用于理解 LNP、mRNA 递送、公开数据库和数据驱动建模背景：

1. Hou et al., **Lipid nanoparticles for mRNA delivery**, *Nature Reviews Materials*, 2021.  
   https://www.nature.com/articles/s41578-021-00358-0

2. Webb et al., **The 60-year evolution of lipid nanoparticles for nucleic acid delivery**, *Nature Reviews Drug Discovery*, 2024.  
   https://www.nature.com/articles/s41573-024-00977-6

3. FDA, **Continuous Manufacturing of Liposomes and Lipid Nanoparticles**.  
   https://www.fda.gov/science-research/fda-science-forum/continuous-manufacturing-liposomes-and-lipid-nanoparticles

4. FDA, **New Class of Drugs Fulfills Promise of RNA-based Medicine**.  
   https://www.fda.gov/drugs/spotlight-cder-science/new-class-drugs-fulfills-promise-rna-based-medicine

5. Collins et al., **Lipid Nanoparticle Database towards structure-function modeling and data-driven design for nucleic acid delivery**, *Nature Communications*, 2026.  
   https://www.nature.com/articles/s41467-026-68818-1

6. **LNP Atlas: Lipid Nanoparticle Database**.  
   https://lnp-atlas.kisti.re.kr/

7. A. Eygeris et al., **Payload distribution and capacity of mRNA lipid nanoparticles**, *Nature Communications*, 2022.  
   https://www.nature.com/articles/s41467-022-33157-4

8. NIST publication page, **Ionization and Structural Properties of mRNA Lipid Nanoparticles that Influence Expression in Intramuscular and Intravascular Administration**.  
   https://www.nist.gov/publications/ionization-and-structural-properties-mrna-lipid-nanoparticles-influence-expression

9. DeepChem ChemBERTa model card, **DeepChem/ChemBERTa-77M-MLM**.  
   https://huggingface.co/DeepChem/ChemBERTa-77M-MLM
