---
slug: black-box-architecture-ai-prompts
title: "Stop Your Code from Rotting: AI Prompts for Modular Architecture"
authors: gl0bal01
tags: [ai, coding, productivity]
keywords: [black box architecture, ai prompts, claude code, software architecture, modular design, eskil steenberg, code maintainability, refactoring, ai coding assistants, developer productivity]
description: "Transform codebases into modular, maintainable systems using AI. Specialized prompts teach Claude Code to apply Eskil Steenberg's battle-tested architecture principles for constant developer velocity."
date: 2025-10-26
---

import Highlight from '@site/src/components/Highlight';
import Youtube from '@site/src/components/Youtube';

# Stop Your Code from Rotting: AI Prompts for Modular Architecture

Year 1: Ship features in days. Year 3: Same features take weeks. Year 5: You're afraid to touch anything.

Sound familiar? What if your codebase could maintain **constant velocity** regardless of size? That's the promise of black box architecture—and now you can teach your AI assistant to think this way automatically.

<!-- truncate -->

---
<Youtube videoId="sSpULGNHyoI" />
---

## The Problem

Traditional codebases decay predictably. Tight coupling, leaky abstractions, and god objects make every change risky. Change one line, break three files.

## The Solution: Black Box Architecture

Eskil Steenberg—who built 3D engines and networked games entirely in C—discovered something profound:

> **"It's faster to write 5 lines of code today than to write 1 line today and then have to edit it in the future."**

His approach maintains **constant developer velocity** through five principles:

1. **Primitive-First Design** - Identify core data types
2. **Black Box Boundaries** - Modules communicate through documented interfaces only
3. **Replaceable Components** - Any module can be rewritten using just its interface
4. **Single Responsibility** - One module = one person can own it
5. **Wrap Dependencies** - Never depend directly on external code

## Teaching AI to Think Architecturally

AI coding assistants are powerful but often default to quick fixes over architectural thinking. They'll add another parameter to your god object instead of questioning the design.

<Highlight>The solution? **[black-box-architecture](https://github.com/gl0bal01/black-box-architecture)**—prompts and skills that guide Claude Code to apply these principles automatically.</Highlight>

## Three Specialized Prompts

### 1. Refactor (`/arch`)

Breaks apart monoliths and creates clean module boundaries.

**Task**: "Analyze UserService and break it into black box modules"

**You get**: Current architecture analysis, coupling issues, proposed design, refactoring plan, and risk assessment—all with `file:line` references.

### 2. Plan (`/arch-plan`)

Designs new systems from scratch with black box principles.

**Task**: "Design a real-time chat app architecture"

**You get**: System primitives, module boundaries, interface specs, phased roadmap, and team organization.

### 3. Debug (`/arch-debug`)

Systematic debugging with modular isolation.

**Task**: "Users report intermittent auth failures"

**You get**: Module isolation strategy, black box testing approach, interface validation, and fix plan that maintains boundaries.

## Before & After Example

### Before (Tightly Coupled)

```python
class UserManager:
    def __init__(self):
        self.db = PostgresConnection()  # ❌ Direct dependency
        self.mailer = SendGrid(api_key="...")  # ❌ Direct dependency

    def register(self, email, password):
        # ❌ Doing too much: validation, hashing, storage, email
        if not self._validate_email(email):
            raise ValueError("Invalid email")
        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        user_id = self.db.execute("INSERT INTO users ...", email, hashed)
        self.mailer.send(to=email, subject="Welcome!", body="Thanks!")
        return user_id
```

**Problems**: Can't test without DB and SendGrid. Can't swap email provider. Too complex for one person.

### After (Black Box)

```python
# Define clear interfaces
class UserRepository(Protocol):
    def save(self, user: User) -> UserId: ...

class EmailService(Protocol):
    def send_welcome(self, email: str) -> None: ...

class PasswordHasher(Protocol):
    def hash(self, password: str) -> str: ...

# Single responsibility service
class UserRegistrar:
    def __init__(self, repository: UserRepository,
                 email_service: EmailService, hasher: PasswordHasher):
        self._repo = repository
        self._email = email_service
        self._hasher = hasher

    def register(self, email: str, password: str) -> UserId:
        if not self._is_valid_email(email):
            raise ValueError("Invalid email")

        user = User(email=email, password_hash=self._hasher.hash(password))
        user_id = self._repo.save(user)
        self._email.send_welcome(email)
        return user_id
```

**Benefits**: Testable in isolation, swap implementations easily, clear purpose, one person can own each module.

## The 4-Phase Protocol

Each prompt follows a structured workflow:

1. **Discovery (15-20%)** - Map structure, find primitives, **STOP and confirm**
2. **Analysis (25-30%)** - Identify boundaries, map dependencies, find violations
3. **Design (30-35%)** - Design interfaces, show examples, **get approval**
4. **Implementation (30-35%)** - Refactor one module at a time, test continuously

## Installation & Usage

```bash
# Install as commands
git clone https://github.com/gl0bal01/black-box-architecture
cp -r commands/ .claude/commands/

# Use in Claude Code
/arch Refactor PaymentProcessor to use black box design
/arch-plan Design a multi-tenant SaaS architecture
/arch-debug Why do tests fail when I mock the database?
```

## Language Support

Examples in **6 languages**:

- **Python** - Protocols, dependency injection
- **TypeScript** - Interfaces, generics
- **Go** - Interfaces, struct composition
- **Rust** - Traits, zero-cost abstractions
- **C** - Opaque types, function pointers (Eskil's way!)
- **PHP** - Service containers, Laravel integration

## Real-World Impact

**Before**:

- Feature velocity: Decreasing
- Test coverage: Hard (mocking nightmare)
- Onboarding: Weeks
- Technical debt: Growing

**After**:

- Feature velocity: **Constant** (new modules)
- Test coverage: **High** (mock interfaces)
- Onboarding: **Days** (own single modules)
- Technical debt: **Decreasing** (rewrite when needed)

## Token Efficiency

- **Compact versions**: ~3,300 tokens (all three prompts)
- **Enhanced versions**: ~12,000 tokens (with examples)
- **71% smaller** while maintaining full workflow

## When to Use

**`/arch` (refactor)**: Codebase feels tangled, tests complex, changes break things

**`/arch-plan`**: Starting new project, designing architecture, evaluating tech choices

**`/arch-debug`**: Bug unclear, tests fail intermittently, mocking difficult

## Success Metrics

**Developer velocity**:

- Time to add feature: Constant over years
- Time to fix bug: Localized to single module
- Onboarding: < 1 day

**Code quality**:

- Lines per module: < 500
- Methods per interface: < 10
- Dependencies per module: < 5

## Resources

- **Original Philosophy**: [Eskil's Lecture](https://www.youtube.com/watch?v=sSpULGNHyoI) (1 hour)
- **Repository**: [github.com/gl0bal01/black-box-architecture](https://github.com/gl0bal01/black-box-architecture)
- **Principles Guide**: [Deep dive](https://github.com/gl0bal01/black-box-architecture/blob/main/docs/PRINCIPLES.md)
- **Examples**: [6 languages](https://github.com/gl0bal01/black-box-architecture/tree/main/examples)

## The Bottom Line

Software doesn't have to rot. These AI prompts teach your assistant to **design for humans first, machines second**. To build systems that are simple, modular, and replaceable.

Try them on your next refactoring task. Your future self will thank you.

---

**Open source (MIT). Not affiliated with Anthropic or Eskil Steenberg. Just battle-tested principles, packaged for the AI era.**
