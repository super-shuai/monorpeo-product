---
name: commit
description: "快速提交代码。用 Haiku 模型分析 git diff 并生成符合 Conventional Commits 规范的中文提交消息，然后自动完成 commit 和 push。当用户说\"提交代码\"、\"commit\"、\"/commit\"、\"提交这些更改\"时触发。跳过 lint/type-check 等质量检查，只管快速提交。"
---

# 快速提交

用 Haiku 模型快速生成 commit 消息并完成提交。不做代码质量检查，不做深度分析，只管提交。

## 流程

### 第 1 步：收集变更信息

并行运行：

```bash
git status
git diff --staged
git diff
git log --oneline -5
```

如果没有已暂存的变更，先执行 `git add .` 暂存所有变更（排除 `.env.local`、`node_modules/`、`.next/`、`dist/`）。

### 第 2 步：用 Haiku 生成 commit 消息

派遣一个 Haiku 子代理（Agent tool，model: "haiku"）来生成 commit 消息。

给 Haiku 的 prompt 模板：

```
你是一个 commit 消息生成器。根据以下 git diff 输出，生成一条符合 Conventional Commits 规范的中文提交消息。

规则：
- 格式：`<type>(<scope>): <中文描述>`
- type 从以下选择：feat, fix, docs, style, refactor, perf, test, chore, ci, build
- scope 参考：shell, wallet, shared, utils, store, services, i18n, trading, token, auth, kline, 或具体组件名
- description 用中文，祈使语气，简洁明了
- 如果改动简单，只需一行消息
- 如果改动复杂（多文件/多功能），加上简短正文说明影响范围
- 末尾加 `Submitted by {author_name}`（用 git config user.name 的值）
- 不要包含任何 AI 署名（不要 Generated with Claude、Co-Authored-By 等）
- 破坏性变更在 type 后加 `!`，如 `refactor(api)!:`

git diff 输出：
{diff_content}

最近的提交风格参考：
{recent_commits}

只输出 commit 消息本身，不要任何解释或包裹。
```

### 第 3 步：提交并推送

用 HEREDOC 格式创建提交：

```bash
git commit -m "$(cat <<'EOF'
{haiku 生成的 commit 消息}
EOF
)"
```

然后推送：

```bash
git push
# 新分支用 git push -u origin HEAD
```

## 注意事项

- 不提交 `.env.local`、`node_modules/`、`.next/`、`dist/`
- 不包含 AI 署名
- pre-commit hook 失败时，修复后创建新 commit（不用 --amend）
- 推送失败时用 `git pull --rebase && git push`