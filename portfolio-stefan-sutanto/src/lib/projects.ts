/**
 * Project data and utilities
 */

export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  domain: string;
  date: string;
  status: "completed" | "in-progress";
  github?: string;
  liveDemo?: string;
  summary: string;
  brsContent?: string;
  archContent?: string;
}

/**
 * Project data - manually maintained for simplicity
 */
export const projects: Project[] = [
  {
    slug: "ledger-system",
    title: "Ledger System",
    description:
      "A modern accounting and invoicing system inspired by Jurnal.id, featuring double-entry bookkeeping, invoice management, expense tracking, and a React dashboard.",
    techStack: ["FastAPI", "React", "TypeScript", "SQLAlchemy", "PostgreSQL"],
    domain: "Full Stack",
    date: "2024-12",
    status: "completed",
    github: "https://github.com/stefansutanto/ledger-system",
    summary: `
# Ledger System

## Overview
A full-stack accounting application built with FastAPI backend and React frontend, implementing core accounting features including invoice management, expense tracking, and double-entry bookkeeping.

## Key Features
- 📄 Invoice Management - Create and track customer invoices
- 💰 Expense Tracking - Record and categorize business expenses
- 📋 Bills Management - Manage vendor bills and payments
- 👥 Contact Management - Maintain customer and vendor databases
- 💾 Journal Entries - Double-entry bookkeeping system
- 📊 Dashboard - Overview of all transactions

## Technical Highlights
- RESTful API design with FastAPI
- SQLAlchemy ORM for database abstraction
- Type-safe frontend with TypeScript
- Modular component architecture

## Achievement
Successfully implemented a complete accounting system with proper financial data integrity and validation.
    `,
  },
  {
    slug: "diabetes-prediction",
    title: "Diabetes Prediction ML Competition",
    description:
      "Kaggle competition entry for diabetes prediction using ensemble methods. Implemented CatBoost and LightGBM models with feature engineering, achieving competitive AUC scores.",
    techStack: ["Python", "CatBoost", "LightGBM", "scikit-learn", "Pandas"],
    domain: "ML/Data Science",
    date: "2024-12",
    status: "completed",
    github: "https://github.com/stefansutanto/kaggle-diabetes",
    summary: `
# Diabetes Prediction

## Overview
Machine learning competition entry for predicting diabetes risk based on health indicators. Used ensemble methods combining CatBoost and LightGBM with extensive feature engineering.

## Approach
- Feature engineering: Created interaction features (age_bmi, bmi_waist_ratio, hdl_to_ldl)
- Binned features for non-linear relationships
- 5-fold stratified cross-validation
- Ensemble: Weighted blend of CatBoost and LightGBM
- Meta-learner: LogisticRegression on base model predictions

## Results
- LightGBM OOF AUC: 0.7260
- CatBoost OOF AUC: 0.7261
- Weighted Ensemble OOF AUC: 0.7261
- Meta-learner OOF AUC: 0.7261

## Technical Highlights
- Robust cross-validation strategy
- Careful handling of categorical features
- Feature importance analysis
- Model persistence and reproducibility
    `,
  },
  {
    slug: "spaceship-titanic",
    title: "Spaceship Titanic",
    description:
      "Kaggle competition for predicting spaceship passenger transport. Applied data preprocessing, feature engineering, and classification models.",
    techStack: ["Python", "scikit-learn", "Pandas"],
    domain: "ML/Data Science",
    date: "2024-11",
    status: "completed",
    summary: `
# Spaceship Titanic

## Overview
Classification challenge to predict which passengers were transported to an alternate dimension during the Spaceship Titanic's collision.

## Approach
- Data preprocessing and cleaning
- Feature engineering from passenger attributes
- Classification model training and evaluation

## Technical Highlights
- Exploratory data analysis
- Feature selection and engineering
- Model evaluation with appropriate metrics
    `,
  },
  {
    slug: "gold-price-analysis",
    title: "Gold Price Data Analysis",
    description:
      "Data science project analyzing gold price trends and patterns. Used time series analysis and statistical methods to extract insights from historical gold price data.",
    techStack: ["Python", "Pandas", "NumPy", "Jupyter", "Matplotlib"],
    domain: "Data Science",
    date: "2024-11",
    status: "completed",
    summary: `
# Gold Price Analysis

## Overview
Exploratory data analysis of gold price trends, examining patterns, correlations, and potential predictive indicators.

## Approach
- Time series visualization and decomposition
- Statistical analysis of price movements
- Correlation analysis with other indicators
- Feature identification for potential modeling

## Technical Highlights
- Data cleaning and preprocessing
- Time series visualization
- Statistical hypothesis testing
- Insight generation from raw data
    `,
  },
];

/**
 * Get all unique tech stacks from projects
 */
export function getAllTechStacks(): string[] {
  const techSet = new Set<string>();
  projects.forEach((project) => {
    project.techStack.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}

/**
 * Get all unique domains from projects
 */
export function getAllDomains(): string[] {
  const domainSet = new Set<string>();
  projects.forEach((project) => domainSet.add(project.domain));
  return Array.from(domainSet).sort();
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Filter projects by tech stack and domain
 */
export function filterProjects(
  selectedTech: string[],
  selectedDomains: string[]
): Project[] {
  return projects.filter((project) => {
    const techMatch =
      selectedTech.length === 0 ||
      selectedTech.some((tech) => project.techStack.includes(tech));
    const domainMatch =
      selectedDomains.length === 0 ||
      selectedDomains.includes(project.domain);
    return techMatch && domainMatch;
  });
}
