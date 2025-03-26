# 微调训练数据集

## 1 概念

微调训练数据集（Fine-tuning Dataset）指针对特定任务优化预训练模型时使用的标注数据集，具有以下特征：

- 小规模（通常千级样本）
- 强标注（任务特定标签）
- 领域聚焦性
- 高信噪比



## 2 获取公开数据集

## 2.1 HuggingFace

**平台特性**：全球最大 AI 社区提供的标准化数据集库
**访问方式**：

- Hugging Face Hub（https://huggingface.co/datasets）
- Python 库直接加载：`from datasets import load_dataset`

**核心优势**：

1. 跨模态支持：文本 / 图像 / 音频 / 表格
2. 内置预处理工具
3. 社区标注协作机制

**典型数据集**：

- 文本：IMDB（情感分析）、Squad（问答）
- 图像：CIFAR-10（图像分类）
- 多模态：COCO（图像描述）

**使用示例**：

```python
from datasets import load_dataset
dataset = load_dataset("imdb")  # 直接加载数据集
```



## 2.2 Kaggle

**平台特性**：全球最大数据科学竞赛平台
**访问方式**：

- 官网下载（[kaggle.com/datasets](https://kaggle.com/datasets)）
- API 调用：`kaggle datasets download -d dataset-name`

**核心优势**：

1. 竞赛级高质量标注
2. 领域覆盖广泛（医疗 / 金融 / 社会科学）
3. 数据探索与可视化工具

**典型科研数据集**：

- 医疗：RSNA 肺炎检测（X 光片）
- 生物：人类蛋白质图谱（细胞图像）
- 环境：NASA 全球火灾数据集

**使用建议**：

1. 关注 "Featured" 标签获取权威数据集
2. 利用 Kaggle Kernels 进行在线数据分析



## 2.3 Google Dataset Search

**平台特性**：跨平台数据集搜索引擎
**访问地址**：https://datasetsearch.research.google.com/

**核心功能**：

1. 支持 120 + 数据源（Kaggle/Figshare 等）
2. 高级过滤选项（领域 / 格式 / 许可）
3. 自动关联相关研究论文

**搜索示例**：

```plaintext
搜索："COVID-19 chest CT scan" filter:format="csv" license:cc-by
```



## 2.4 GitHub 开源项目 awesome-public-datasets

**项目特性**：人工精选数据集导航仓库
**访问地址**：https://github.com/awesomedata/awesome-public-datasets

**数据分类**：

- 按领域：天文学 / 生物学 / 经济学
- 按任务：分类 / 回归 / 生成
- 按格式：CSV/JSON/Parquet

**特色资源**：

- 教育数据集：UCI 机器学习库镜像
- 政府公开数据：世界银行 / 欧盟统计局
- 特殊格式：3D 模型（ShapeNet）/ 时间序列（电力消耗）



## 2.5 OpenDataLab

**平台特性**：中文多模态数据集平台
**访问地址**：https://opendatalab.com/

**核心优势**：

1. 本土化支持：中文标注 / 领域适配
2. 多模态集成：图像 / 视频 / 文本 / 点云
3. 标注工具链：支持在线标注协作

**典型数据集**：

- 自动驾驶：BDD100K（视频 + 标注）
- 遥感：WHU-RS19（高光谱图像）
- 中文 NLP：ChnSentiCorp（情感分析）



## 2.6 ModelScope 魔塔社区

**平台特性**：一站式 AI 开发平台
**访问地址**：https://modelscope.cn/datasets

**核心功能**：

1. 数据集与模型无缝对接
2. 支持分布式数据处理
3. 领域覆盖：CV/NLP/ 语音 / 多模态

**典型案例**：

- 图像分割：COCO-Stuff
- 视频理解：Kinetics-400
- 代码生成：CodeSearchNet

**使用流程**：

1. 在线预览数据集
2. 直接调用模型进行验证
3. 导出预处理后的数据格式



## 2.7 开源协议注意事项

**常见许可类型**：

| 协议类型                    | 允许商业使用 | 修改后分发 | 署名要求 |
| --------------------------- | ------------ | ---------- | -------- |
| CC BY-NC-ND                 | ❌            | ❌          | ✅        |
| Apache 2.0                  | ✅            | ✅          | ✅        |
| MIT                         | ✅            | ✅          | ❌        |
| Creative Commons Zero (CC0) | ✅            | ✅          | ❌        |

**关键注意事项**：

1. 检查数据来源是否为 "Public Domain"
2. 注意标注数据的二次许可
3. 医疗 / 生物数据需额外伦理审查

**综合使用建议**：

1. 优先选择 HuggingFace/Kaggle 等成熟平台
2. 结合 Google Dataset Search 进行跨平台检索
3. 重要任务建议混合多源数据（如 HuggingFace+OpenDataLab）
4. 使用前通过`license`字段验证数据合规性

建议读者通过实际案例操作加深理解，例如：

```python
# 使用HuggingFace加载数据集并过滤
from datasets import load_dataset
dataset = load_dataset("imdb", split="train[:1000]")  # 加载前1000条样本
```





## 3 基于垂直领域文献合成数据集

## 3.1 目前的做法

* 完全不知道怎么做，目前纯人工去做，想提高效率。
* 将文档丢给AI，使用prompt让AI生成，效果差。
* 已经有整理出来的数据集了，想有一个批量管理数据集的地方，可以进行标注和验证。
* 对于数据集有细分领域的需求，不知道如何去构建领域标签。
* 想从一个格式的数据集转换成另一个格式的数据集，不知道怎么转换。
* 

### 3.2 easy-dataset 开源框架

 [GitHub 地址 easy-dataset](https://github.com/ConardLi/easy-dataset/blob/main/README.zh-CN.md)

​        Easy Dataset 是一个专为创建大型语言模型（LLM）微调数据集而设计的应用程序。它提供了直观的界面，用于上传特定领域的文件，智能分割内容，生成问题，并为模型微调生成高质量的训练数据。

通过 Easy Dataset，您可以将领域知识转化为结构化数据集，兼容所有遵循 OpenAI 格式的 LLM API，使微调过程变得简单高效。

#### 3.2.1 实践方法--使用 NPM 安装

克隆仓库：

```
   git clone https://github.com/ConardLi/easy-dataset.git 
   也可以使用我下载好的
   
   cd easy-dataset
```

安装依赖：

```
   npm install
```

启动开发服务器：

```
   npm run build

   npm run start
```



#### 3.2.2 将旅游的PDF拆解为一问一答

目录： ../static/杭州攻略.pdf

根据这个说明一步步做会生成得到的数据集：[B站链接](https://www.bilibili.com/video/BV1piQwYmEb3/?spm_id_from=333.337.search-card.all.click&vd_source=53c8f153d9fee3c0f48b1468ba6b99f5)

使用自定义的格式导出数据集：

![image-20250326143255877](D:\302ShuSheng\AiSource\No200\No202DataPeople\No08createData\image-20250326143255877.png)



得到了数据集：

![image-20250326143341580](D:\302ShuSheng\AiSource\No200\No202DataPeople\No08createData\image-20250326143341580.png)

这里可以看到生成的数据以及非常ok了，对比了pdf几组数据已经非常可用了；

数据路径：..static/datasets-1742810712416-alpaca-2025-03-26.json

但这种生成数据只有一个来回也就是不能连续的进行问题询问，这个时候我们需要数据增强；



### 3.3 数据增强

#### 3.3.1 定义

进行数据增强，主要是通过对已有数据进行多样化的扩展和补充来实现。以下是具体的操作方法：

1. 文本数据增强
   - **改写**：输入原始文本，利用特定工具或人工方式，以不同的表述方式重写内容。例如，对产品描述进行改写，改变用词、句式结构，生成多种版本，丰富语料库，使模型学习到更多表达方式。
   - **翻译**：借助翻译工具，将文本翻译成不同语言，再翻译回原语言。这个过程中，工具会对词汇和语法进行调整，生成语义相近但表述不同的文本，增加数据的多样性。
   - **续写和扩写**：针对不完整或简短的文本，通过人工续写或使用相关工具进行续写或扩写。如给定一个故事开头，续写后续情节；或对简单的事件描述进行详细扩展，丰富文本内容和细节，提升模型对长文本和复杂语义的理解与处理能力。
2. 问答数据增强
   - **生成相似问题**：输入问题，通过人工构思或特定工具生成语义相近但表述不同的问题。以客服问答数据为例，增加问题的多样性，使模型能够学习到同一意图的不同问法，提高问答系统的准确性和泛化能力。
   - **补充多轮对话**：根据现有的问答对，人工或借助工具生成多轮对话场景。模拟真实对话中的追问、澄清等环节，让模型学习到对话的连贯性和上下文理解，提升在复杂对话场景下的表现。
3. 分类数据增强
   - **生成边缘案例**：对于分类任务，输入类别信息，通过人工构造或特定工具生成接近类别边界或容易混淆的样本数据。如在图像分类中，生成与多个类别特征相似的图像描述数据，帮助模型更好地区分不同类别，提高分类的准确性和鲁棒性。
   - **增加类别描述**：人工或借助工具为每个类别生成详细的描述信息，补充类别特征，使模型对各类别特征的理解更深入，优化分类效果。
4. 数据增强的实施步骤
   - **数据准备**：明确任务需求，收集和整理原始数据，确保数据质量。
   - **选择合适工具**：根据任务复杂度、数据规模和预算，选择合适的数据处理工具或平台。
   - **确定增强策略**：根据数据类型和任务目标，确定具体的数据增强策略和参数，如改写的程度、生成数据的数量等。
   - **生成数据**：使用选定的工具或平台，按照确定的策略生成增强数据。
   - **数据筛选和清洗**：对生成的数据进行筛选和清洗，去除重复、错误或不符合要求的数据。
   - **整合和验证**：将增强数据与原始数据合并，进行数据质量验证，评估增强效果。



#### 3.3.2 使用

下面这个案例以预定酒店场景使用大模型进行数据增强：

(1)对酒店设施的描述进行口语化重写
(2)补充一定比例的多轮问答和结束语对话
(3)补充按酒店名(简称)、价格上限查询等对话







参考：

[数据增强说明视频](https://www.bilibili.com/video/BV13aQJY5E1H/?spm_id_from=333.337.search-card.all.click&vd_source=53c8f153d9fee3c0f48b1468ba6b99f5)

[源代码GitHub地址](https://github.com/NanGePlus/DataAugmentationTest)



## 4 优化和建议

[如何整理训练数据以及微调优化建议](https://www.bilibili.com/video/BV1vrksYgEP9/?spm_id_from=333.337.search-card.all.click&vd_source=53c8f153d9fee3c0f48b1468ba6b99f5)

LLM 模型微调数据集怎么整理 ?

1.微调数据集应该弄成什么样?
2.可不可以让AI帮我整理数据?
3.为什么我的微调效果不好?
4.业务场景中微调数据怎么来?





参考：

[【微调教程】10分钟教会你构建模型微调训练数据集，将领域文献转化成私有数据！](https://www.bilibili.com/video/BV1piQwYmEb3/?spm_id_from=333.337.search-card.all.click&vd_source=53c8f153d9fee3c0f48b1468ba6b99f5)



