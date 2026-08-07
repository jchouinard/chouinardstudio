# Chouinard Studios Bridge Context

## Active Context

Organization:
Team Chouinard

Product:
Chouinard Studios

Repository:
chouinardstudio

Domain:
chouinardstudio.com

Product Role:
Operating business / future AI Support Customer Zero

Product AI:
ChatGPT

Engineering AI:
Claude

## Repository Boundary

This repository contains Chouinard Studios only.

Do not modify:

- AI Support
- Decision Widget
- Piksake
- any other Team Chouinard product

Do not create cross-repository source dependencies unless explicitly approved.

Do not treat this repository as part of a monorepo.

## Product Collaboration Bridge

Founder -> ChatGPT Product Review -> Product Decisions -> Claude Engineering -> Runtime Verification -> Playtest -> ChatGPT Product Critique -> Iteration

ChatGPT owns product strategy, experience design, customer journeys, information architecture, positioning, prioritization, UX critique, and cross-product product reasoning.

Claude owns implementation, technical architecture, runtime verification, testing, code quality, Product KB maintenance, engineering review packages, and safe repository changes.

## Cross-Product Dependency

Approved dependency:
AI Support

Relationship:
Chouinard Studios is expected to become a real AI Support customer and Customer Zero when AI Support is ready for that lifecycle stage.

Do not couple Chouinard Studios to unfinished AI Support architecture.

Consume approved AI Support capabilities when they become ready rather than recreating them locally.

## Cross-Product Findings

If Chouinard Studios work reveals something that properly belongs to another Team Chouinard product, do not implement that capability here.

Record the finding in:

C:\Users\jocho\Projects\team-chouinard\CROSS-PRODUCT-FINDINGS.md

Required fields:

Origin:
Chouinard Studios

Affected Product:
<product>

Finding:
<finding>

Reason:
<why the affected product owns it>

## Current Approved Scope

Environment and Team OS initialization only.

Do not begin website implementation until repository setup, Git/GitHub setup, Product KB initialization, VS Code isolation, and engineering handoff are complete.

Do not invent unapproved business requirements.
