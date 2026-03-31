# 开放能力栏目与 HTML 转 PPTX 页面设计

## 背景

当前站点已经包含“使用指南”“快速开始”“API 参考”“定价”等顶层栏目，但还没有承载更抽象、更贴近能力输出的“开放能力”栏目。

本次需要新增一个独立的顶层导航“开放能力”，用于承载 DocMee AiPPT 对外开放的能力型文档。第一期先上线一个页面：“HTML 转 PPTX”。

该页面不是单纯的 API 参考页，而是一个“能力介绍 + 接口详情”的单页，既要向开发者解释能力边界、输入要求、结果特性，也要给出完整的请求与响应设计。

## 目标

- 新增顶层导航“开放能力”
- 在该栏目下新增单页“HTML 转 PPTX”
- 页面同时承担能力说明和接口文档两种职责
- 明确接口地址、请求体设计、响应结构设计和错误码规则
- 明确说明返回的是有时效限制的 OSS 临时下载地址，用户需尽快下载并自行保存
- 明确说明部分页面转换失败时的处理方式，并告诉开发者如何识别失败页

## 非目标

- 本次不建设“开放能力”栏目首页或多能力目录页
- 本次不扩展更多开放能力页面
- 本次不改造现有“API 参考”栏目的结构
- 本次不引入新的数据驱动文档系统

## 信息架构

### 顶层导航

在站点顶层导航中新增：

- `开放能力`

当前该栏目下只包含一个页面：

- `HTML 转 PPTX`

### 文件结构

建议新增：

- `content/open-capabilities/_meta.tsx` 或 `content/open-capabilities/_meta.ts`
- `content/open-capabilities/html-to-pptx.mdx`

并在顶层 `content/_meta.tsx` 中加入 `open-capabilities` 入口。

## 页面定位

该页面采用“能力介绍 + 接口详情”的单页结构，而不是纯 API 参考页。

原因：

- 这是“开放能力”栏目下的首个页面，需要先建立“能力”的认知，再进入接口细节
- 该能力的输入约束和结果特性比普通接口更值得前置说明
- 用户已明确希望顶部先讲能力边界、适用场景和限制，再进入接口文档

## 页面结构

建议页面按以下顺序组织：

### 1. 页面标题与一句话定义

标题：

- `HTML 转 PPTX`

一句话定义：

- 接收多个 HTML 页面字符串，将其组合转换为一个可下载的 PPTX 文件。

### 2. 能力说明

向开发者说明：

- 输入是按顺序传入的 HTML 字符串数组
- 服务会将这些 HTML 页面按顺序组合生成一个 PPTX 文件
- 输出结果不是文件二进制流，而是一个可下载的 OSS 临时地址

### 3. 适用场景

建议列出 3 个典型场景：

- 将业务系统中渲染完成的报告页面转成 PPT
- 将 H5 或可视化页面快照式归档为演示文稿
- 将服务端批量生成的 HTML 页面组合为标准 PPT 交付文件

### 4. 重要说明

使用统一提示块集中表达以下内容：

- 返回的是带时效限制的 OSS 临时下载地址
- 请在链接失效前尽快下载并自行保存
- 平台不做长期保存
- 单个页面可能转换失败，但整体仍可能生成成功文件
- 失败页是否保留为空白页或直接跳过，取决于请求参数 `pageErrorMode`

### 5. 输入要求

这一节是本能力的核心约束，需要独立写清，而不是埋在参数表中。

必须明确：

- 每个 HTML 必须包含一个 `.slide` 类元素，系统将其视为单页根容器
- 同一次请求中的所有 HTML 页面必须是同一尺寸
- `htmls` 数组顺序就是最终 PPT 中的页顺序

### 6. 接口详情

包含：

- 方法
- 接口地址
- 鉴权方式
- 请求体类型
- 请求示例
- 请求参数表

### 7. 响应说明

分成三类结果解释：

- 完全成功
- 部分成功
- 整体失败

### 8. 错误码说明

单独列出参数错误和程序错误的边界。

### 9. 结果处理建议

告诉开发者收到响应后应如何处理：

- 立即下载并转存文件
- 根据 `failedPageDetails` 决定是否重试失败页
- 在业务侧记录失败页索引与错误原因

## 接口设计

### 基本信息

- 方法：`POST`
- 地址：`/v2/api/htmljson-bridge/convert-html-to-json`
- 请求体：`application/json`
- 鉴权：请求头传 `token`

### 最终接口契约

以下契约在本次文档中直接定稿，不保留歧义：

- 接口地址按既有对外路径保留为 `/v2/api/htmljson-bridge/convert-html-to-json`
- 虽然路径名中包含 `json`，但该接口的实际能力是将 HTML 页面数组转换并组合为 PPTX 文件
- `pageErrorMode` 省略时，默认值为 `blank`
- `failedPageDetails[].index` 使用 `1-based`，即第 1 个 HTML 页面返回 `index: 1`
- 请求级参数错误只用于请求体结构或字段值不合法的场景
- 单页 HTML 内容不满足转换要求时，按“页级失败”处理，而不是直接判定整个请求为参数错误

### 请求级错误与页级失败的边界

#### 返回 `40010` 的场景

- 请求体不是合法 JSON
- `htmls` 字段缺失、不是数组或数组为空
- `htmls` 中元素类型不是字符串
- `pageErrorMode` 不是 `blank` 或 `skip`

#### 进入 `failedPageDetails` 的场景

- 某个 HTML 中未找到 `.slide` 根元素
- 某个 HTML 的页面尺寸与本次请求中的标准尺寸不一致
- 某个 HTML 在转换阶段发生单页渲染失败，但不影响其他页面继续处理

#### 返回整体失败的场景

- 请求级参数错误，返回 `40010`
- 所有页面都转换失败，返回 `50103`
- 服务内部异常导致无法产出文件，返回 `50199`

## 请求体设计

### 请求示例

```json
{
  "htmls": [
    "<div class=\"slide\" style=\"width:1280px;height:720px\">...</div>",
    "<div class=\"slide\" style=\"width:1280px;height:720px\">...</div>"
  ],
  "pageErrorMode": "blank"
}
```

### 请求字段

| 字段名 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `htmls` | `string[]` | 是 | `["<div class=\"slide\">...</div>"]` | 待转换的 HTML 页面数组，数组顺序即最终 PPT 页顺序。 |
| `pageErrorMode` | `string` | 否 | `blank` | 单页转换失败时的处理策略。可选值：`blank`、`skip`。默认值为 `blank`。 |

### 输入规则与处理规则

- `htmls` 不能为空，且至少包含 1 个 HTML 字符串
- 每个 HTML 都应包含 `.slide` 类元素；缺失时该页记为失败页
- 同一次请求中的所有 HTML 页面都应是同一尺寸；尺寸不一致时对应页面记为失败页
- `pageErrorMode=blank` 时，失败页在最终 PPT 中保留为空白页
- `pageErrorMode=skip` 时，失败页在最终 PPT 中被跳过，不会出现在结果文件中

## 响应设计

### 1. 完全成功

所有页面都成功转换时，返回成功态和下载地址：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "fileUrl": "https://oss-example/docmee/xxx.pptx?Expires=1719999999&Signature=xxx",
    "expireAt": "2026-03-31T16:30:00Z",
    "totalPages": 5,
    "successPages": 5,
    "failedPages": 0,
    "pageErrorMode": "blank",
    "failedPageDetails": []
  }
}
```

### 2. 部分成功

只要至少有 1 个页面成功并最终生成了 PPT 文件，接口仍返回成功态 `code = 0`。失败页面通过 `failedPageDetails` 告知：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "fileUrl": "https://oss-example/docmee/xxx.pptx?Expires=1719999999&Signature=xxx",
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

这里需要明确表达：

- `fileUrl` 是最终 PPT 文件的临时下载地址
- `expireAt` 是链接失效时间
- `failedPageDetails` 用于告诉开发者哪些页面失败了
- `finalAction` 用于说明失败页在最终 PPT 中是被留空还是被跳过
- `failedPageDetails[].index` 为 1-based 索引

### 3. 整体失败

以下情况返回整体失败，不返回 `fileUrl`：

- 请求参数不合法
- 所有页面都转换失败，无法生成有效 PPT
- 平台内部异常，无法完成转换

参数错误示例：

```json
{
  "code": 40010,
  "message": "invalid request parameters",
  "data": {
    "requestId": "req_20260331_xxx",
    "errorCode": "INVALID_REQUEST",
    "errorDetails": [
      {
        "field": "htmls",
        "reason": "htmls must not be empty"
      }
    ]
  }
}
```

程序错误示例：

```json
{
  "code": 50103,
  "message": "failed to generate pptx",
  "data": {
    "requestId": "req_20260331_xxx",
    "errorCode": "ALL_PAGES_FAILED",
    "errorDetails": [
      {
        "field": "htmls[1]",
        "reason": "HTML 中未找到 .slide 根元素"
      },
      {
        "field": "htmls[3]",
        "reason": "页面尺寸与其他页面不一致"
      }
    ]
  }
}
```

## 错误码设计

错误码分层如下：

### 参数错误

- `40010`

适用范围：

- `htmls` 为空
- `htmls` 缺失或不是数组
- `htmls` 中存在非字符串元素
- 字段类型不正确
- `pageErrorMode` 取值非法
- 请求体结构不合法

### 程序错误

程序错误统一使用 `501xx` 段。

建议至少包含：

| 错误码 | errorCode | 说明 |
| --- | --- | --- |
| `50101` | `MISSING_SLIDE_ELEMENT` | 页级失败分类码，可用于 `failedPageDetails[].reasonCode`。 |
| `50102` | `PAGE_SIZE_MISMATCH` | 页级失败分类码，可用于 `failedPageDetails[].reasonCode`。 |
| `50103` | `ALL_PAGES_FAILED` | 所有页面都转换失败，最终无法生成 PPT。 |
| `50199` | `INTERNAL_ERROR` | 服务内部异常，无法完成转换。 |

补充约定：

- `50101` 和 `50102` 默认作为页级失败分类码使用
- 顶层整体失败默认使用 `40010`、`50103`、`50199`
- `errorDetails.field` 采用请求体字段路径表示法，例如 `htmls[1]`
- `failedPageDetails[].index` 采用 1-based 页码表示法，用于告诉调用方第几页失败

## 响应字段建议

建议在文档中将以下字段作为重点字段解释：

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| `code` | `number` | 通用响应状态码。`0` 表示本次已生成可下载文件。 |
| `message` | `string` | 响应说明。 |
| `data.fileUrl` | `string` | 最终 PPT 文件的 OSS 临时下载地址。 |
| `data.expireAt` | `string` | 下载地址失效时间。 |
| `data.totalPages` | `number` | 本次请求提交的总页数。 |
| `data.successPages` | `number` | 成功转换并进入最终 PPT 的页数。 |
| `data.failedPages` | `number` | 转换失败的页数。 |
| `data.pageErrorMode` | `string` | 本次请求的失败页处理策略。 |
| `data.failedPageDetails[]` | `object[]` | 失败页面明细。 |
| `data.failedPageDetails[].index` | `number` | 失败页面在原始输入数组中的位置，使用 1-based。 |
| `data.failedPageDetails[].code` | `number` | 页级失败分类码，默认使用 `50101` 或 `50102`。 |
| `data.failedPageDetails[].reason` | `string` | 失败原因说明。 |
| `data.failedPageDetails[].finalAction` | `string` | 失败页最终处理结果，值为 `blank` 或 `skip`。 |

## 结果判定规则

文档中应明确告诉开发者如何判定结果：

- `code = 0` 且存在 `data.fileUrl`：已生成可下载 PPT
- `code = 0` 且 `data.failedPages > 0`：部分页面失败，但文件仍可用
- `code = 40010`：参数错误，需要修正请求后重试
- `code = 501xx`：服务处理失败，本次没有可下载文件

## 文案重点

页面中的重要提示需要明确写出：

- 返回的 `fileUrl` 是有时效限制的 OSS 临时下载地址
- 请在链接失效前尽快下载并自行保存
- 平台不会对结果文件进行长期保存
- 如果业务需要归档，请在收到响应后立即转存到自有存储系统

## 实施范围

本次实现应包含：

- 更新顶层导航 `content/_meta.tsx`
- 新增 `content/open-capabilities/_meta.tsx` 或等价文件
- 新增 `content/open-capabilities/html-to-pptx.mdx`

## 验收标准

- 站点顶层导航中出现“开放能力”
- 用户可以进入“HTML 转 PPTX”页面
- 页面同时包含能力说明、输入要求、请求参数、响应设计、错误码说明和最佳实践
- 页面中明确写出 `.slide` 根元素要求和同尺寸要求
- 页面中明确写出返回地址是有时效限制的 OSS 临时下载地址
- 页面中明确写出部分失败与整体失败的判定方式
- 错误码规则符合最终约定：
  - 参数错误：`40010`
  - 程序错误：`501xx`
