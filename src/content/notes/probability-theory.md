---
title: "概率论基础概念与常用分布"
description: "概率论中的基本概念、条件概率、常见分布及其应用"
date: 2023-07-10
tags: ["数学", "概率论", "统计", "分布"]
category: "概率统计"
draft: false
---

# 概率论基础概念与常用分布

## 基本概念

### 样本空间与事件

- **样本空间** $\Omega$：所有可能结果的集合
- **事件** $A$：样本空间的子集
- **空事件** $\emptyset$：不包含任何样本点的事件
- **必然事件** $\Omega$：包含所有样本点的事件

### 概率的公理化定义

概率 $P$ 是定义在事件集合上的函数，满足：
1. 非负性：$P(A) \geq 0$
2. 规范性：$P(\Omega) = 1$
3. 可列可加性：若 $A_1, A_2, \ldots$ 互不相交，则 $P(\cup_{i=1}^{\infty} A_i) = \sum_{i=1}^{\infty} P(A_i)$

### 条件概率与独立性

**条件概率**：事件 $B$ 已发生的条件下，事件 $A$ 发生的概率
$$ P(A|B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0 $$

**事件独立性**：若 $P(A \cap B) = P(A) \cdot P(B)$，则称事件 $A$ 和 $B$ 相互独立

### 全概率公式与贝叶斯公式

**全概率公式**：若 $B_1, B_2, \ldots, B_n$ 构成样本空间的一个划分，则
$$ P(A) = \sum_{i=1}^{n} P(A|B_i)P(B_i) $$

**贝叶斯公式**：
$$ P(B_i|A) = \frac{P(A|B_i)P(B_i)}{\sum_{j=1}^{n} P(A|B_j)P(B_j)} $$

## 随机变量

随机变量是从样本空间到实数集的函数，通常用大写字母 $X, Y$ 表示。

### 离散型随机变量

**概率质量函数 (PMF)**：$p_X(x) = P(X = x)$，满足：
1. $p_X(x) \geq 0$
2. $\sum_{x} p_X(x) = 1$

**常见离散分布**：

1. **伯努利分布** $X \sim \text{Bernoulli}(p)$：单次试验成功/失败
   $$ P(X = 1) = p, \quad P(X = 0) = 1-p $$
   期望：$E[X] = p$，方差：$\text{Var}[X] = p(1-p)$

2. **二项分布** $X \sim \text{Binomial}(n, p)$：$n$ 次独立重复试验中成功的次数
   $$ P(X = k) = \binom{n}{k} p^k (1-p)^{n-k} $$
   期望：$E[X] = np$，方差：$\text{Var}[X] = np(1-p)$

3. **泊松分布** $X \sim \text{Poisson}(\lambda)$：单位时间/空间内随机事件发生的次数
   $$ P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!} $$
   期望：$E[X] = \lambda$，方差：$\text{Var}[X] = \lambda$

### 连续型随机变量

**概率密度函数 (PDF)**：$f_X(x)$，满足：
1. $f_X(x) \geq 0$
2. $\int_{-\infty}^{\infty} f_X(x) dx = 1$

**分布函数 (CDF)**：$F_X(x) = P(X \leq x) = \int_{-\infty}^{x} f_X(t) dt$

**常见连续分布**：

1. **均匀分布** $X \sim \text{Uniform}(a, b)$：随机变量在区间 $[a, b]$ 上均匀分布
   $$ f_X(x) = \begin{cases} 
   \frac{1}{b-a}, & a \leq x \leq b \\
   0, & \text{otherwise}
   \end{cases} $$
   期望：$E[X] = \frac{a+b}{2}$，方差：$\text{Var}[X] = \frac{(b-a)^2}{12}$

2. **正态分布** $X \sim \mathcal{N}(\mu, \sigma^2)$：自然界中最常见的分布
   $$ f_X(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}} $$
   期望：$E[X] = \mu$，方差：$\text{Var}[X] = \sigma^2$

3. **指数分布** $X \sim \text{Exp}(\lambda)$：描述独立随机事件之间的时间间隔
   $$ f_X(x) = \begin{cases} 
   \lambda e^{-\lambda x}, & x \geq 0 \\
   0, & x < 0
   \end{cases} $$
   期望：$E[X] = \frac{1}{\lambda}$，方差：$\text{Var}[X] = \frac{1}{\lambda^2}$

## 多维随机变量

### 联合分布与边缘分布

**联合分布**：描述多个随机变量的概率关系
- 离散：$p_{X,Y}(x,y) = P(X=x, Y=y)$
- 连续：$f_{X,Y}(x,y)$ 是联合概率密度函数

**边缘分布**：单个随机变量的分布
- 离散：$p_X(x) = \sum_y p_{X,Y}(x,y)$
- 连续：$f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x,y) dy$

### 条件分布

随机变量 $Y$ 给定条件下，$X$ 的条件分布：
- 离散：$p_{X|Y}(x|y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}$
- 连续：$f_{X|Y}(x|y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}$

### 随机变量的独立性

若随机变量 $X$ 和 $Y$ 相互独立，则：
- 离散：$p_{X,Y}(x,y) = p_X(x) \cdot p_Y(y)$
- 连续：$f_{X,Y}(x,y) = f_X(x) \cdot f_Y(y)$

## 随机变量的数字特征

### 期望

**离散随机变量**：$E[X] = \sum_x x \cdot p_X(x)$

**连续随机变量**：$E[X] = \int_{-\infty}^{\infty} x \cdot f_X(x) dx$

### 方差与标准差

**方差**：$\text{Var}[X] = E[(X-E[X])^2] = E[X^2] - (E[X])^2$

**标准差**：$\sigma_X = \sqrt{\text{Var}[X]}$

### 协方差与相关系数

**协方差**：$\text{Cov}(X,Y) = E[(X-E[X])(Y-E[Y])] = E[XY] - E[X]E[Y]$

**相关系数**：$\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$，其中 $-1 \leq \rho_{X,Y} \leq 1$
- $\rho_{X,Y} = 0$：$X$ 和 $Y$ 不相关
- $\rho_{X,Y} = \pm 1$：$X$ 和 $Y$ 完全线性相关

## 大数定律与中心极限定理

### 大数定律

若 $X_1, X_2, \ldots, X_n$ 是独立同分布的随机变量，期望为 $\mu$，则对于任意 $\varepsilon > 0$：
$$ \lim_{n \to \infty} P\left( \left| \frac{1}{n} \sum_{i=1}^{n} X_i - \mu \right| < \varepsilon \right) = 1 $$

### 中心极限定理

若 $X_1, X_2, \ldots, X_n$ 是独立同分布的随机变量，期望为 $\mu$，方差为 $\sigma^2 < \infty$，则：
$$ \frac{\sum_{i=1}^{n} X_i - n\mu}{\sigma\sqrt{n}} \xrightarrow{d} \mathcal{N}(0,1) $$
其中 $\xrightarrow{d}$ 表示依分布收敛。 