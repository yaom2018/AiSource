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

### 3.2 easy-dataset 开源框架

[easy-dataset](https://github.com/ConardLi/easy-dataset/blob/main/README.zh-CN.md)





参考：

[【微调教程】10分钟教会你构建模型微调训练数据集，将领域文献转化成私有数据！](https://www.bilibili.com/video/BV1piQwYmEb3/?spm_id_from=333.337.search-card.all.click&vd_source=53c8f153d9fee3c0f48b1468ba6b99f5)



