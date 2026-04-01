# 开放能力栏目与 HTML 转 PPTX 多页文档设计

## 背景

站点已经新增顶层导航“开放能力”，并以“HTML 转 PPTX”作为第一项对外能力。原始实现采用单页结构，将能力介绍、接入约束、快速开始、接口契约、错误码和最佳实践全部放在同一页中。

用户希望将这一能力改造成更适合开发者阅读的多页文档结构，使“认知类内容”和“契约类内容”分离，开发者能够按“了解能力 -> 阅读前置约束 -> 跑通 Demo -> 查完整接口 -> 查错误码 -> 做生产化接入”的路径浏览。

同时，用户新增一个“能力计费”页，但当前阶段只需要提供空白占位页。

## 目标

- 将 `HTML 转 PPTX` 从单页改造成多页子导航结构
- 在 `HTML 转 PPTX` 下提供 7 个子页面：
  - 能力介绍
  - 接入须知
  - 快速开始
  - 完整 API 文档
  - 错误码说明
  - 最佳实践
  - 能力计费
- 明确每个页面的职责边界，避免重复和信息混杂
- 保留既有接口契约不变，仅调整文档组织方式
- “能力计费”页先留空，占位即可

## 非目标

- 本次不新增第二个开放能力
- 本次不修改接口路径或错误码设计
- 本次不改造现有“API 参考”栏目
- 本次不引入新的全局 UI 组件或新的文档框架

## 信息架构

### 顶层导航

保留现有顶层导航：

- `开放能力`

### 二级导航

`开放能力` 下保留：

- `HTML 转 PPTX`

### 三级导航

`HTML 转 PPTX` 下新增以下 7 个子页面：

- `能力介绍`
- `接入须知`
- `快速开始`
- `完整 API 文档`
- `错误码说明`
- `最佳实践`
- `能力计费`

## 文件结构

建议改造成如下目录：

- `content/open-capabilities/_meta.ts`
- `content/open-capabilities/html-to-pptx/_meta.ts`
- `content/open-capabilities/html-to-pptx/introduction.mdx`
- `content/open-capabilities/html-to-pptx/integration-notes.mdx`
- `content/open-capabilities/html-to-pptx/quickstart.mdx`
- `content/open-capabilities/html-to-pptx/api-reference.mdx`
- `content/open-capabilities/html-to-pptx/error-codes.mdx`
- `content/open-capabilities/html-to-pptx/best-practices.mdx`
- `content/open-capabilities/html-to-pptx/pricing.mdx`

原有单页：

- `content/open-capabilities/html-to-pptx.mdx`

在本次改造后应移除或让位给目录结构，不再作为最终对外页面存在。

## 导航文案

建议在 `content/open-capabilities/_meta.ts` 中将 `html-to-pptx` 作为目录节点展示为：

- `HTML 转 PPTX`

在 `content/open-capabilities/html-to-pptx/_meta.ts` 中定义子页面文案：

- `introduction`: `能力介绍`
- `integration-notes`: `接入须知`
- `quickstart`: `快速开始`
- `api-reference`: `完整 API 文档`
- `error-codes`: `错误码说明`
- `best-practices`: `最佳实践`
- `pricing`: `能力计费`

## 阅读路径设计

推荐开发者阅读顺序：

1. `能力介绍`
2. `接入须知`
3. `快速开始`
4. `完整 API 文档`
5. `错误码说明`
6. `最佳实践`

`能力计费` 当前仅作占位，不纳入主阅读链路。

## 页面职责边界

### 1. 能力介绍

用途：

- 说明这项能力是什么
- 说明输入输出是什么
- 告诉开发者适合什么场景

应包含：

- 一句话定义
- 典型适用场景
- 输入与输出概览
- 能力边界
- 推荐阅读顺序

不应包含：

- 详细参数表
- 完整响应字段表
- 错误码表

### 2. 接入须知

用途：

- 承担所有“接入前必须知道”的前置约束

应包含：

- 鉴权方式
- `.slide` 根元素要求
- 同一次请求中的所有 HTML 必须同尺寸
- `htmls` 顺序即最终 PPT 页顺序
- `fileUrl` 为临时 OSS 下载地址
- 平台不做长期保存
- 调用方需尽快下载并自行存档
- 单页失败与 `pageErrorMode` 的关系

不应包含：

- 大段请求/响应表格
- 多种成功/失败响应的完整 JSON 契约

### 3. 快速开始

用途：

- 让开发者最快速跑通一次调用

应包含：

- 最小可运行请求示例
- 最小成功响应示例
- 如何从响应中提取 `fileUrl`
- 如何快速判断是否存在失败页

不应包含：

- 所有字段的详细定义
- 全量错误码表

### 4. 完整 API 文档

用途：

- 作为唯一的接口契约页

应包含：

- 方法、路径、鉴权、Content-Type
- 请求参数表
- 成功响应
- 部分成功响应
- 整体失败响应
- 响应字段说明

不应包含：

- 过多场景说明
- 最佳实践型建议
- 大段接入须知内容

### 5. 错误码说明

用途：

- 集中解释错误体系和处理建议

应包含：

- `40010`
- `50101`
- `50102`
- `50103`
- `50199`
- 每个错误码的含义、触发条件、建议处理方式

### 6. 最佳实践

用途：

- 指导开发者完成生产化接入

应包含：

- 请求前对 HTML 做结构自检
- 如何选择 `pageErrorMode`
- 收到结果后立即下载并转存
- 如何记录失败页索引与失败原因
- 如何做重试、告警与排查

### 7. 能力计费

用途：

- 作为后续计费说明的占位页

当前阶段应包含：

- 页面标题
- 简短说明“能力计费信息即将上线”

当前阶段不应包含：

- 虚构的计费规则
- 未确认的价格、额度或套餐说明

## 既有接口契约

本次改造不改变既有接口契约，仍按以下口径编写：

- 方法：`POST`
- 地址：`/v2/api/htmljson-bridge/convert-html-to-json`
- 对外完整路径：`https://open.docmee.cn/v2/api/htmljson-bridge/convert-html-to-json`
- 请求体：`application/json`
- 鉴权：请求头传 `token`

补充说明：

- 虽然路径名中包含 `json`，但该接口的实际能力是将 HTML 页面数组转换并组合为 PPTX 文件

## 请求契约

请求体结构保持不变：

```json
{
  "htmls": [
    "<div class=\"slide\" style=\"width:1280px;height:720px\">...</div>",
    "<div class=\"slide\" style=\"width:1280px;height:720px\">...</div>"
  ],
  "pageErrorMode": "blank"
}
```

字段约定保持不变：

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `htmls` | `string[]` | 是 | HTML 页面字符串数组，顺序即最终 PPT 页顺序。 |
| `pageErrorMode` | `string` | 否 | 单页失败处理策略，取值 `blank` 或 `skip`，默认 `blank`。 |

## 请求级错误与页级失败边界

### 返回 `40010` 的场景

- 请求体不是合法 JSON
- `htmls` 字段缺失、不是数组或数组为空
- `htmls` 中存在非字符串元素
- `pageErrorMode` 不是 `blank` 或 `skip`

### 页级失败场景

以下问题不直接判定为整单参数错误，而是进入页级失败处理：

- 某个 HTML 中未找到 `.slide` 根元素
- 某个 HTML 的页面尺寸与本次请求中的标准尺寸不一致
- 某个 HTML 在转换阶段发生单页渲染失败，但不影响其他页面继续处理

## 响应契约

### 完全成功

所有页面都成功转换时：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "fileUrl": "https://oss-example/docmee/result.pptx?Expires=1774955400&Signature=xxx",
    "expireAt": "2026-03-31T16:30:00Z",
    "totalPages": 5,
    "successPages": 5,
    "failedPages": 0,
    "pageErrorMode": "blank",
    "failedPageDetails": []
  }
}
```

### 部分成功

只要至少有 1 个页面成功并最终生成了文件，接口仍返回：

- `code = 0`

失败页通过 `failedPageDetails` 返回：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "fileUrl": "https://oss-example/docmee/result.pptx?Expires=1774955400&Signature=xxx",
    "expireAt": "2026-03-31T16:30:00Z",
    "totalPages": 5,
    "successPages": 3,
    "failedPages": 2,
    "pageErrorMode": "blank",
    "failedPageDetails": [
      {
        "index": 2,
        "code": 50101,
        "reason": "HTML 中未找到 .slide 根元素",
        "finalAction": "blank"
      },
      {
        "index": 4,
        "code": 50102,
        "reason": "该页面尺寸与其他页面不一致",
        "finalAction": "blank"
      }
    ]
  }
}
```

补充约定：

- `failedPageDetails[].index` 使用 1-based
- `finalAction` 取值为 `blank` 或 `skip`
- `50101` 和 `50102` 默认作为页级失败分类码使用

### 整体失败

整体失败时不返回可下载文件地址。

参数错误示例：

```json
{
  "code": 40010,
  "message": "invalid request parameters",
  "data": {
    "requestId": "req_20260331_xxx",
    "errorDetails": [
      {
        "field": "htmls",
        "reason": "htmls must not be empty"
      }
    ]
  }
}
```

全部页面失败示例：

```json
{
  "code": 50103,
  "message": "all pages failed",
  "data": {
    "requestId": "req_20260331_xxx",
    "errorDetails": [
      {
        "field": "htmls[2]",
        "reason": "HTML 中未找到 .slide 根元素"
      },
      {
        "field": "htmls[4]",
        "reason": "该页面尺寸与其他页面不一致"
      }
    ]
  }
}
```

服务内部异常示例：

```json
{
  "code": 50199,
  "message": "internal program error",
  "data": {
    "requestId": "req_20260331_xxx"
  }
}
```

## 错误码设计

错误码体系保持不变：

| 错误码 | 层级 | 说明 |
| --- | --- | --- |
| `40010` | 请求级 | 请求体结构或字段值不合法。 |
| `50101` | 页级 | 页面内容不满足转换要求，例如缺少 `.slide` 根元素。 |
| `50102` | 页级 | 页面约束或渲染失败，例如页面尺寸不一致。 |
| `50103` | 顶层程序错误 | 所有页面都失败，最终未生成文件。 |
| `50199` | 顶层程序错误 | 服务内部程序异常。 |

## 页面之间的内容分配原则

为了避免重复，以下内容分配应固定：

- `.slide` 根元素要求、同尺寸要求、临时 OSS 地址、平台不长期保存：放在 `接入须知`
- 最短请求链路与最小成功样例：放在 `快速开始`
- 请求参数表、响应字段表、完整 JSON 契约：放在 `完整 API 文档`
- 错误码定义与处理建议：放在 `错误码说明`
- 重试、归档、监控、失败页策略建议：放在 `最佳实践`

## 实施范围

本次实现应包含：

- 更新 `content/open-capabilities/_meta.ts`
- 新增 `content/open-capabilities/html-to-pptx/_meta.ts`
- 新增 7 个子页面
- 迁移原单页中的内容到对应子页面
- 删除或废弃原 `content/open-capabilities/html-to-pptx.mdx`

## 验收标准

- `开放能力 / HTML 转 PPTX` 变为多页子导航结构
- 存在以下页面：
  - 能力介绍
  - 接入须知
  - 快速开始
  - 完整 API 文档
  - 错误码说明
  - 最佳实践
  - 能力计费
- `接入须知` 中明确出现：
  - `.slide` 根元素要求
  - 同尺寸要求
  - 临时 OSS 下载地址说明
  - 平台不长期保存说明
- `完整 API 文档` 中明确出现：
  - 接口地址
  - 请求参数
  - 成功/部分成功/整体失败响应
- `错误码说明` 中明确出现：
  - `40010`
  - `50101`
  - `50102`
  - `50103`
  - `50199`
- `能力计费` 页面存在且为占位状态
