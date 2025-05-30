---
title: "反卷数学局 - 排列组合的奇妙冒险2"
date: 2025-05-12T15:10:15.232Z
description: "深入探讨组合数学中一个极其重要且富有洞察力的框架——十二重计数法"
tags: ["十二重计数法","单射","满射","第二类斯特林数","排列组合"]
category: "组合数学"
draft: false
---

# 深入探索组合数学的基石：十二重计数法 (The Twelvefold Way)

大家好，我是你们的反卷门ccj。今天，我想和大家一同深入探讨组合数学中一个极其重要且富有洞察力的框架——**十二重计数法 (The Twelvefold Way)**。这个理论框架由 Gian-Carlo Rota 等数学家系统化，为我们理解和解决各种“球入盒”类型的计数问题提供了一个统一的视角。它不仅仅是一张包含12个公式的表格，更是一种思考问题、分类问题的方法论。

---

## 引言：为何我们需要“十二重”之法？

在组合学的研究中，我们经常面临这样一个基本问题：将 $n$ 个物体（我们称之为“球”）放入 $k$ 个容器（我们称之为“盒子”）中，共有多少种不同的放置方法？

这个问题的答案并非一成不变，它高度依赖于以下三个核心属性的组合：

1.  **球的可区分性 (Distinguishability of Balls):**
    *   **可区分球 (Labeled/Distinguishable Balls):** 每个球都是独特的，可以被识别。例如，编号为 1 到 $n$ 的球，或 $n$ 个不同的人。
    *   **不可区分球 (Unlabeled/Indistinguishable Balls):** 所有的球都完全相同，无法区分彼此。例如，$n$ 个完全相同的白色小球。

2.  **盒的可区分性 (Distinguishability of Bins):**
    *   **可区分盒 (Labeled/Distinguishable Bins):** 每个盒子都有其唯一的身份或标签。例如，标有 A, B, C 的盒子，或不同的房间。
    *   **不可区分盒 (Unlabeled/Indistinguishable Bins):** 所有的盒子都完全相同。例如，$k$ 个完全相同的未标记袋子。

3.  **放置规则/映射条件 (Mapping Conditions):** 这描述了球与盒子之间的函数关系。
    *   **任意放置 (No Restriction / Arbitrary Functions):** 每个球可以放入任何盒子，允许盒子为空，也允许一个盒子包含多个球。这对应从球集合到盒集合的任意**函数 (Function)**。
    *   **单射 (Injective / At most one ball per bin):** 每个盒子最多只能容纳一个球。这意味着球的数量 $n$ 必须小于或等于盒子的数量 $k$ ($n \le k$)。这对应从球集合到盒集合的**单射函数 (Injective Function)**。
    *   **满射 (Surjective / At least one ball per bin):** 每个盒子必须至少包含一个球。这意味着球的数量 $n$ 必须大于或等于盒子的数量 $k$ ($n \ge k$)。这对应从球集合到盒集合的**满射函数 (Surjective Function)**。

将这三个属性的各种状态组合起来 ($2 \text{ (球)} \times 2 \text{ (盒)} \times 3 \text{ (规则)}$)，我们就得到了 $12$ 种不同的计数场景，这便是“十二重计数法”的由来。

在接下来的内容中，我将逐一剖析这12种情况，给出它们的数学模型、计算公式，并尽可能解释其背后的组合意义。我们将约定用 $n$ 表示球的数量，用 $k$ 表示盒子的数量。

---

## 十二重计数法的逐一解析

### 第一大类：球可区分 (D)，盒可区分 (D)

在这种情况下，我们处理的是 $n$ 个不同的球和 $k$ 个不同的盒子。

#### 1. D 球, D 盒, 任意放置 (Functions)
*   **描述:** 将 $n$ 个不同的球放入 $k$ 个不同的盒子，允许空盒，允许一个盒子放多个球。
*   **数学模型:** 从一个大小为 $n$ 的集合（球）到大小为 $k$ 的集合（盒子）的**函数**数量。
*   **推导:** 对于每一个球，它都有 $k$ 个独立的盒子选择。由于有 $n$ 个球，且每个球的选择是独立的，根据乘法原理：
*   **公式:** $k^n$
*   **示例:** 将 3 个不同的学生（张三、李四、王五）分配到 2 个不同的自习室（A 室、B 室），每个学生可以选择 A 室或 B 室。总方法数 $2^3 = 8$。

#### 2. D 球, D 盒, 单射 (Injective Functions, $n \le k$)
*   **描述:** 将 $n$ 个不同的球放入 $k$ 个不同的盒子，每个盒子最多放一个球。
*   **数学模型:** 从大小为 $n$ 的集合到大小为 $k$ 的集合的**单射函数**数量，也即 $k$ 元集上的 $n$-**排列 (Permutations)**。
*   **推导:**
    *   第一个球有 $k$ 个盒子可选。
    *   第二个球有 $k-1$ 个盒子可选（因为第一个球已占用一个）。
    *   ...
    *   第 $n$ 个球有 $k-n+1$ 个盒子可选。
*   **公式:** $P(k,n) = k(k-1)\cdots(k-n+1) = \frac{k!}{(k-n)!}$ (当 $n \le k$)
    *   如果 $n > k$，则无法满足单射条件，方法数为 0。
*   **示例:** 从 5 个候选人中选出 3 人分别担任主席、副主席、秘书（职位不同，人也不同）。$P(5,3) = 5 \times 4 \times 3 = 60$。

#### 3. D 球, D 盒, 满射 (Surjective Functions, $n \ge k$)
*   **描述:** 将 $n$ 个不同的球放入 $k$ 个不同的盒子，要求每个盒子至少有一个球。
*   **数学模型:** 从大小为 $n$ 的集合到大小为 $k$ 的集合的**满射函数**数量。
*   **推导:**
    这个问题可以使用**第二类斯特林数 (Stirling Numbers of the Second Kind)**，记作 $S(n,k)$ 或 $\begin{Bmatrix} n \\ k \end{Bmatrix}$。$S(n,k)$ 表示将 $n$ 个可区分的元素划分成 $k$ 个非空的不可区分的子集的方案数。
    由于盒子是可区分的，我们将 $n$ 个球分成 $k$ 个非空组后（有 $S(n,k)$ 种方法），这 $k$ 个组还需要分配到 $k$ 个不同的盒子中，这有 $k!$ 种排列方式。
    另一种推导方法是使用**容斥原理 (Principle of Inclusion-Exclusion)**：
    总的函数数量为 $k^n$。减去至少有一个盒子为空的情况，加上至少有两个盒子为空的情况，以此类推。
    $\sum_{i=0}^{k} (-1)^i \binom{k}{i} (k-i)^n$
*   **公式:** $k! S(n,k) = k! \begin{Bmatrix} n \\ k \end{Bmatrix} = \sum_{i=0}^{k} (-1)^i \binom{k}{i} (k-i)^n$
    *   如果 $n < k$，则无法满足满射条件，方法数为 0。
*   **示例:** 将 4 封不同的信件投递到 3 个不同的邮箱，要求每个邮箱至少有一封信。
    $S(4,3)$:
    - {{a,b},{c},{d}} (3 ways to choose the pair)
    - {{a},{b},{c,d}} (3 ways)
    - {{a},{c},{b,d}} (3 ways)
    - {{a},{d},{b,c}} (3 ways)
    - {{a,c},{b},{d}} -> already counted
    Actually, S(4,3) = 6 (e.g., {{1,2},{3},{4}}, {{1,3},{2},{4}}, {{1,4},{2},{3}}, {{2,3},{1},{4}}, {{2,4},{1},{3}}, {{3,4},{1},{2}})
    $S(4,3) = 6$.
    所以 $3! \times S(4,3) = 6 \times 6 = 36$ 种方法。
    使用容斥原理：$\binom{3}{0}(3-0)^4 - \binom{3}{1}(3-1)^4 + \binom{3}{2}(3-2)^4 - \binom{3}{3}(3-3)^4 = 1 \cdot 3^4 - 3 \cdot 2^4 + 3 \cdot 1^4 - 1 \cdot 0^4 = 81 - 3 \cdot 16 + 3 \cdot 1 = 81 - 48 + 3 = 36$.

---

### 第二大类：球不可区分 (I)，盒可区分 (D)

在这种情况下，我们处理的是 $n$ 个相同的球和 $k$ 个不同的盒子。

#### 4. I 球, D 盒, 任意放置 (Stars and Bars - basic)
*   **描述:** 将 $n$ 个相同的球放入 $k$ 个不同的盒子，允许空盒。
*   **数学模型:** 求解非负整数方程 $x_1 + x_2 + \cdots + x_k = n$ 的解的个数，其中 $x_i$ 表示第 $i$ 个盒子中的球数。这通常使用**星号与隔板法 (Stars and Bars)**。
*   **推导:** 想象 $n$ 个球（星号 `*`) 排成一列。为了将它们分成 $k$ 组（对应 $k$ 个盒子），我们需要 $k-1$ 个隔板 `|`。问题转化为在 $n$ 个星号和 $k-1$ 个隔板组成的序列中，选择 $k-1$ 个位置放置隔板（或 $n$ 个位置放置星号）。总共有 $n + k - 1$ 个位置。
*   **公式:** $\binom{n+k-1}{k-1} = \binom{n+k-1}{n}$
*   **示例:** 将 5 个相同的糖果放入 3 个不同的盘子。
    $\binom{5+3-1}{3-1} = \binom{7}{2} = \frac{7 \times 6}{2} = 21$ 种方法。

#### 5. I 球, D 盒, 单射 ($n \le k$)
*   **描述:** 将 $n$ 个相同的球放入 $k$ 个不同的盒子，每个盒子最多放一个球。
*   **数学模型:** 由于球是不可区分的，问题等价于从 $k$ 个可区分的盒子中选择 $n$ 个盒子来放置球（每个选中的盒子放一个球）。
*   **推导:** 这直接是组合的定义。
*   **公式:** $\binom{k}{n}$
    *   如果 $n > k$，方法数为 0。
*   **示例:** 从 5 个不同的插槽中选择 3 个来放置 3 个相同的芯片。$\binom{5}{3} = 10$ 种方法。

#### 6. I 球, D 盒, 满射 ($n \ge k$)
*   **描述:** 将 $n$ 个相同的球放入 $k$ 个不同的盒子，要求每个盒子至少有一个球。
*   **数学模型:** 求解正整数方程 $x_1 + x_2 + \cdots + x_k = n$ ($x_i \ge 1$) 的解的个数。
*   **推导:**
    仍然使用星号与隔板法。首先，给每个盒子预先分配一个球，这样就用掉了 $k$ 个球。现在剩下 $n-k$ 个球需要分配到 $k$ 个盒子中，允许空盒（因为我们已经保证每个盒子至少有一个了）。
    问题转化为将 $n-k$ 个相同的球放入 $k$ 个不同的盒子，任意放置。套用情况4的公式，令新的球数为 $n' = n-k$。
    需要 $n-k$ 个星号和 $k-1$ 个隔板。总位置 $(n-k) + (k-1) = n-1$。
*   **公式:** $\binom{(n-k)+k-1}{k-1} = \binom{n-1}{k-1}$
    *   如果 $n < k$，方法数为 0。
*   **示例:** 将 7 个相同的苹果分给 3 个不同的小朋友，要求每人至少一个。
    先给每人一个，剩 $7-3=4$ 个苹果。将 4 个苹果分给 3 人（可空）。
    $\binom{4+3-1}{3-1} = \binom{6}{2} = 15$ 种方法。
    或者直接用公式 $\binom{7-1}{3-1} = \binom{6}{2} = 15$.

---

### 第三大类：球可区分 (D)，盒不可区分 (I)

在这种情况下，我们处理的是 $n$ 个不同的球和 $k$ 个相同的盒子。这意味着我们只关心球是如何分组的，而不关心哪个组在哪个盒子里。

#### 7. D 球, I 盒, 任意放置
*   **描述:** 将 $n$ 个不同的球放入 $k$ 个相同的盒子，允许空盒。
*   **数学模型:** 这等价于将 $n$ 个可区分的元素划分成**至多** $k$ 个非空子集。
*   **推导:** 我们可以将 $n$ 个球分成 1 组，或 2 组，...，或 $k$ 组（如果 $k \ge n$，则最多分成 $n$ 组）。将 $n$ 个球分成 $i$ 个非空不可区分组的方法数是 $S(n,i)$。
*   **公式:** $\sum_{i=1}^{k} S(n,i) = \sum_{i=1}^{k} \begin{Bmatrix} n \\ i \end{Bmatrix}$
    *   如果 $k \ge n$，则公式变为 $\sum_{i=1}^{n} S(n,i) = B_n$，其中 $B_n$ 是**贝尔数 (Bell Number)**，表示将 $n$ 个可区分元素划分成任意数量非空子集的方案数。
*   **示例:** 将 3 个不同的球 (A, B, C) 放入 2 个相同的盒子。
    - 分成 1 组: {A,B,C} (放入一个盒子，另一个空) - $S(3,1)=1$ 种
    - 分成 2 组: {{A,B},{C}}, {{A,C},{B}}, {{B,C},{A}} - $S(3,2)=3$ 种
    总方法数 $S(3,1) + S(3,2) = 1 + 3 = 4$。

#### 8. D 球, I 盒, 单射 ($n \le k$)
*   **描述:** 将 $n$ 个不同的球放入 $k$ 个相同的盒子，每个盒子最多放一个球。
*   **数学模型:** 如果 $n$ 个球要分别放入不同的盒子，并且盒子是不可区分的，这意味着每个球都独立占据一个“位置”。
*   **推导:**
    *   如果 $n > k$，不可能实现，方案数为 0。
    *   如果 $n \le k$: 由于盒子不可区分，我们只是把 $n$ 个球看作是 $n$ 个独立的单元。无论它们“放入”哪些盒子（只要每个盒子一个球），最终的效果都是一样的：$n$ 个球各自占据了一个“槽位”。因此只有一种方式。例如，球 A 在一个盒子，球 B 在另一个盒子，这和球 B 在第一个盒子，球 A 在第二个盒子是一样的，因为盒子没有区别。
*   **公式:**
    $$ \begin{cases} 1 & \text{if } n \le k \\ 0 & \text{if } n > k \end{cases} $$
*   **示例:** 将 2 个不同的球放入 3 个相同的盒子，每盒最多一个。只有一种方法：（球1在一个盒），（球2在另一个盒），（空盒）。

#### 9. D 球, I 盒, 满射 ($n \ge k$)
*   **描述:** 将 $n$ 个不同的球放入 $k$ 个相同的盒子，要求每个盒子至少有一个球。
*   **数学模型:** 这正是**第二类斯特林数 $S(n,k)$** 的定义。
*   **推导:** $S(n,k)$ 定义为将 $n$ 个可区分的元素划分成 $k$ 个非空的不可区分的子集的方案数。每个子集对应一个装有球的盒子。
*   **公式:** $S(n,k) = \begin{Bmatrix} n \\ k \end{Bmatrix}$
    *   如果 $n < k$，方法数为 0。
    *   $S(n,k)$ 可以通过递推公式计算：$S(n,k) = S(n-1, k-1) + k \cdot S(n-1, k)$，边界条件 $S(n,0)=0$ (for $n \ge 1$), $S(n,n)=1$, $S(n,1)=1$, $S(n,k)=0$ (if $k>n$).
*   **示例:** 将 4 个不同的球放入 2 个相同的盒子，每盒至少一个球。
    $S(4,2) = S(3,1) + 2 \cdot S(3,2) = 1 + 2 \cdot 3 = 7$.
    划分方式有: {{1},{2,3,4}}, {{2},{1,3,4}}, {{3},{1,2,4}}, {{4},{1,2,3}}, {{1,2},{3,4}}, {{1,3},{2,4}}, {{1,4},{2,3}}。共 7 种。

---

### 第四大类：球不可区分 (I)，盒不可区分 (I)

这是最具挑战性的一类，通常与**整数分拆 (Integer Partitions)** 相关。

#### 10. I 球, I 盒, 任意放置
*   **描述:** 将 $n$ 个相同的球放入 $k$ 个相同的盒子，允许空盒。
*   **数学模型:** 这等价于将整数 $n$ 分拆成**至多** $k$ 个正整数之和。也就是说，找到非负整数序列 $x_1 \ge x_2 \ge \cdots \ge x_k \ge 0$ 使得 $x_1 + x_2 + \cdots + x_k = n$。
*   **推导:** 这个问题没有简单的封闭形式公式。我们通常用 $p(n, \le k)$ 表示将 $n$ 划分为不超过 $k$ 个部分的方案数。
    这等价于将 $n$ 划分为最大部分不超过 $k$ 的方案数（通过 Ferrers 图的共轭变换可以证明）。
    也等价于 $p_k(n+k)$，即把 $n+k$ 分拆成正好 $k$ 个部分（每个部分至少是1），然后每个部分减1。
    $p(n, \le k) = \sum_{i=1}^{k} p_i(n)$, 其中 $p_i(n)$ 是将 $n$ 划分为正好 $i$ 个部分的划分数。
    计算通常依赖于递推关系或生成函数。
    生成函数方法：系数 $[x^n z^k]$ in $\prod_{j=1}^\infty \frac{1}{1-x^j z}$ (如果盒子数量不限) or for this specific case, coefficients of $x^n$ in $\prod_{i=1}^k \frac{1}{1-x^i}$ (错误，这代表最大块为k).
    正确的生成函数 (对于划分为至多 $k$ 个部分) 是 $P(x,z) = \prod_{j=1}^{\infty} \frac{1}{1-zx^j}$，我们寻找 $[z^k x^n]$ in $(1-z)^{-1} P(x,z)$ (不对).
    更直接地，划分为至多 $k$ 个部分，其生成函数是 $G(x) = \sum_{j=0}^n p(j, \le k) x^j = \prod_{i=1}^k \frac{1}{1-x^i}$ (这代表每个部分大小不超过k)。
    对于将 $n$ 划分为**至多** $k$ 个部分，等价于将 $n$ 划分为最大部分**不超过** $k$。其生成函数是 $\prod_{i=1}^{k} \frac{1}{1-x^i}$。我们寻找 $x^n$ 的系数。
    不，这也不对。$\prod_{i=1}^{k} \frac{1}{1-x^i}$ 是用数字 $1, \dots, k$ 来构成和为 $n$ 的方案数。

    对于 $p(n, \le k)$，即 $n = \lambda_1 + \dots + \lambda_j$ 其中 $j \le k$ 且 $\lambda_i \ge 1$。这等价于 $p_k(n+k)$（将 $n+k$ 分成 $k$ 个部分）。
    实际上，$p(n, \le k)$ (划分为至多 $k$ 部分) 等于 $p_k(n)$ (划分为最大部分为 $k$ 的部分)。
    正确的说法是：将 $n$ 分成**最多** $k$ 个部分的数量等于将 $n$ 分成**最大部分是** $k$ 的数量。
    $p(n, \le k) = \sum_{j=1}^{\min(n,k)} p_j(n)$
*   **公式:** $p(n, \le k) = p_k(n+k)$ (if we consider $p_k(m)$ means partition of $m$ into $k$ parts, possibly zero).
    更标准的表示是 $P(n,k)$ 或 $p_{\le k}(n)$，表示将 $n$ 分拆成不超过 $k$ 个部分的数目。
    $p_{\le k}(n) = p(n | \text{number of parts } \le k)$. 这等于 $p(n | \text{largest part } \le k)$.
    其生成函数是 $\sum_{n=0}^\infty p_{\le k}(n) x^n = \prod_{j=1}^k \frac{1}{1-x^j}$. (这代表每个部分的值不超过 $k$)

    **修正：** 将 $n$ 个不可区分球放入 $k$ 个不可区分盒子（允许空盒），这等价于将整数 $n$ 分拆成**至多** $k$ 个正整数之和。我们用 $p(n, \text{parts} \le k)$ 表示。
    $p(n, \text{parts} \le k) = p(n, \text{largest part} \le k)$.
    这个值的计算通常没有简单的封闭解，但可以通过递推 $p(n,k) = p(n-k, k) + p(n, k-1)$ 得到 (其中 $p(n,k)$ 此处指最大部分不超过 $k$ 的划分数)。
*   **示例:** 将 4 个相同的球放入 3 个相同的盒子，允许空盒。
    $n=4, k=3$.
    Partitions of 4 into at most 3 parts:
    (4) - 1 part
    (3,1) - 2 parts
    (2,2) - 2 parts
    (2,1,1) - 3 parts
    共 4 种。
    $p(4, \text{parts} \le 3)$.
    $p(4,1)=1$ (4)
    $p(4,2)=2$ (3+1, 2+2)
    $p(4,3)=1$ (2+1+1)
    Sum is not $S(n,i)$.
    This is $p_{\le k}(n)$, the number of partitions of $n$ into at most $k$ parts.
    $p_{\le 3}(4)$:
    Parts:
    4 (1 part)
    3,1 (2 parts)
    2,2 (2 parts)
    2,1,1 (3 parts)
    Total = 4.

#### 11. I 球, I 盒, 单射 ($n \le k$)
*   **描述:** 将 $n$ 个相同的球放入 $k$ 个相同的盒子，每个盒子最多放一个球。
*   **数学模型:** 如果 $n$ 个相同的球要分别放入不同的盒子，并且盒子也是相同的。
*   **推导:**
    *   如果 $n > k$，不可能，方案数为 0。
    *   如果 $n \le k$: 由于球和盒子都不可区分，我们只是简单地将 $n$ 个球分别放置。这只有一种方式（即 $n$ 个盒子被占用，每个装一个球，剩下 $k-n$ 个空盒子）。
*   **公式:**
    $$ \begin{cases} 1 & \text{if } n \le k \\ 0 & \text{if } n > k \end{cases} $$
*   **示例:** 将 2 个相同的球放入 3 个相同的盒子，每盒最多一个。只有一种方法：（球在一个盒），（球在另一个盒），（空盒）。

#### 12. I 球, I 盒, 满射 ($n \ge k$)
*   **描述:** 将 $n$ 个相同的球放入 $k$ 个相同的盒子，要求每个盒子至少有一个球。
*   **数学模型:** 这直接是**整数 $n$ 划分为 $k$ 个正整数之和 (Partitions of n into k parts)** 的定义。我们用 $p_k(n)$ 表示。
*   **推导:** $p_k(n)$ 表示将整数 $n$ 写成 $k$ 个正整数 $\lambda_1 + \lambda_2 + \cdots + \lambda_k = n$ 且 $\lambda_1 \ge \lambda_2 \ge \cdots \ge \lambda_k \ge 1$ 的方案数。
    计算 $p_k(n)$ 通常依赖递推关系: $p_k(n) = p_{k-1}(n-1) + p_k(n-k)$.
    边界条件: $p_k(n)=0$ if $n<k$, $p_k(k)=1$, $p_1(n)=1$.
    生成函数: $x^k / ((1-x)(1-x^2)\cdots(1-x^k))$ 是 $p_k(n)$ 的生成函数。
*   **公式:** $p_k(n)$
    *   如果 $n < k$，方法数为 0。
*   **示例:** 将 5 个相同的球放入 3 个相同的盒子，每盒至少一个球。
    $p_3(5)$:
    $5 = 3+1+1$
    $5 = 2+2+1$
    共 2 种方法。

---

## 总结与展望

下表总结了十二重计数法的全部内容：

| 球 (n)       | 盒 (k)       | 放置规则 (映射)                 | 公式/概念                                                                                                                                                                                          |
| :----------- | :----------- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **可区分 (D)** | **可区分 (D)** | 任意                            | $k^n$ (函数)                                                                                                                                                                                       |
|              |              | 单射 ($n \le k$)                | $P(k,n) = \frac{k!}{(k-n)!}$ (单射函数/排列)                                                                                                                                                           |
|              |              | 满射 ($n \ge k$)                | $k! S(n,k) = k! \begin{Bmatrix} n \\ k \end{Bmatrix}$ (满射函数)                                                                                                                                    |
| **不可区分 (I)** | **可区分 (D)** | 任意                            | $\binom{n+k-1}{n} = \binom{n+k-1}{k-1}$ (星号隔板法 / 多重集组合)                                                                                                                                       |
|              |              | 单射 ($n \le k$)                | $\binom{k}{n}$ (组合)                                                                                                                                                                              |
|              |              | 满射 ($n \ge k$)                | $\binom{n-1}{k-1}$ (星号隔板法变种)                                                                                                                                                                  |
| **可区分 (D)** | **不可区分 (I)** | 任意                            | $\sum_{i=1}^{\min(n,k)} S(n,i) = \sum_{i=1}^{\min(n,k)} \begin{Bmatrix} n \\ i \end{Bmatrix}$ (若 $k \ge n$, 则为 $B_n$ 贝尔数)                                                                     |
|              |              | 单射 ($n \le k$)                | $1 \text{ (if } n \le k \text{ else } 0)$                                                                                                                                                             |
|              |              | 满射 ($n \ge k$)                | $S(n,k) = \begin{Bmatrix} n \\ k \end{Bmatrix}$ (第二类斯特林数)                                                                                                                                  |
| **不可区分 (I)** | **不可区分 (I)** | 任意                            | $p(n, \text{parts} \le k)$ (整数 $n$ 划分为至多 $k$ 个部分，等价于划分为最大部分 $\le k$)                                                                                                             |
|              |              | 单射 ($n \le k$)                | $1 \text{ (if } n \le k \text{ else } 0)$                                                                                                                                                             |
|              |              | 满射 ($n \ge k$)                | $p_k(n)$ (整数 $n$ 划分为 $k$ 个部分)                                                                                                                                                               |

**符号说明:**
*   $P(k,n)$: $k$ 中取 $n$ 的排列数。
*   $\binom{k}{n}$: $k$ 中取 $n$ 的组合数。
*   $S(n,k)$ 或 $\begin{Bmatrix} n \\ k \end{Bmatrix}$: 第二类斯特林数。
*   $B_n$: 贝尔数。
*   $p_k(n)$: 整数 $n$ 划分为 $k$ 个正整数部分的方案数。
*   $p(n, \text{parts} \le k)$: 整数 $n$ 划分为至多 $k$ 个正整数部分的方案数。

十二重计数法为我们提供了一个强大的分类和解决基本计数问题的框架。很多更复杂的计数问题，也可以看作是这些基本模型的组合或扩展。例如，当涉及到更复杂的对称性约束时（比如旋转、反射等价），Pólya 枚举定理可以被视为十二重计数法在对称群作用下的推广。

此外，**生成函数 (Generating Functions)** 是处理许多计数问题，特别是涉及不可区分物体或整数分拆问题的强有力工具。对于上述某些情况，尤其是涉及整数分拆的，其计数序列的生成函数具有简洁的表达形式，并能用于推导递推关系或进行渐进分析。