---
id: "infrastructure-architecture-for-persistent-operations"
title: "Infrastructure Architecture for Persistent Operations"
description: "Comprehensive technical guide to building secure, scalable infrastructure for professional sockpuppet operations including network security, browser management, and operational compartmentalization"
author: "gl0bal01"
tags: ["Infrastructure", "Network Security", "Browser Management", "OPSEC", "Osint"]
keywords:
  - VPN
  - residential proxies
  - browser fingerprinting
  - anti-detect browsers
  - network security
  - digital compartmentalization
  - OPSEC
  - anonymization
date: "2025-06-22"
sidebar_position: 3
---
import Highlight from '@site/src/components/Highlight';

# Infrastructure Architecture for Persistent Operations

The foundation of long-term research personas has evolved from simple IP masking to comprehensive digital infrastructure management. This document describes the technical building blocks investigators, journalists, and authorized red-teamers use to maintain durable, compartmentalized accounts for legitimate OSINT work — covering network, browser, communication, and financial infrastructure. See [Introduction](./sockpuppet_01_introduction.md) for foundational concepts and [Persona Development](./sockpuppet_04_persona_development.md) for how this infrastructure supports identity construction.

:::warning Authorization required

The techniques in this document enable persona infrastructure for OSINT investigators, journalists, academic researchers, and authorized red-team operators. Using them for platform abuse, fraud, harassment, or unauthorized surveillance is illegal in most jurisdictions and violates the terms of service of every major platform. Verify local law and platform ToS before applying any of this material.

Operate only with appropriate authorization: IRB approval for academic research, written rules of engagement for red-team work, and badge/warrant authority for law enforcement. If you cannot point to a specific authorization basis, do not proceed.

:::

## Abstract

The foundation of successful long-term sockpuppet operations has evolved from simple IP masking to comprehensive digital infrastructure management. Professional investigators now operate with the same level of technical sophistication as corporate IT departments. This document provides detailed technical specifications for building secure, scalable infrastructure that can support persistent operations while evading sophisticated detection systems.

## Network Infrastructure Architecture

Researchers building durable investigation accounts need stable network infrastructure that survives platform-side fingerprinting and avoids correlating multiple personas back to a single investigator. The techniques below describe how to achieve that within the bounds of authorized research.

:::note Detection landscape

Major platforms (Meta, Google, X) actively block known residential proxy ranges, datacenter ASNs, and hosting providers; quality and detection rates change continuously as platforms and proxy vendors iterate against each other. Validate your infrastructure against your specific research target before relying on it.

:::

### The Residential IP Revolution

Traditional VPN services have become obsolete for account creation due to widespread platform detection and blacklisting. Modern professional operations require residential IP infrastructure that mimics legitimate home internet connections.

:::note

Pricing and feature tiers change frequently. Check the vendor's current pricing page before relying on figures. Major providers include [Bright Data](https://brightdata.com/pricing), [Oxylabs](https://oxylabs.io/pricing), [Decodo (formerly Smartproxy)](https://decodo.com/proxies/residential-proxies/pricing), [NetNut](https://netnut.io/pricing), and [Soax](https://soax.com/pricing).

:::

**Residential Proxy Service Requirements:**
- **Real Home Internet Connections:** Access to genuine residential ISP connections, not datacenter IPs
- **Geographic Diversity:** IP addresses from multiple countries and regions matching persona backgrounds
- **ISP Variety:** Rotation across different Internet Service Providers to avoid pattern detection
- **Session Persistence:** Ability to maintain the same IP for extended periods during account aging
- **Mobile Network Integration:** Access to mobile carrier IPs for platforms that prefer mobile creation

**Technical Implementation:**
```bash
# Example residential proxy configuration
proxy_server = "residential.proxy.service:8080"
proxy_auth = "username:password"
session_id = "persona_001_session"
geo_location = "US-CA-San Francisco"
isp_preference = "Comcast"
```

**Professional Service Evaluation Criteria:**
- Minimum 99.9% uptime reliability
- Sub-100ms latency for major platform access
- Compliance with data protection regulations
- No-logs policy with technical verification
- 24/7 technical support for operational continuity

### Multi-Layer Network Security

Professional operations require defense-in-depth networking that prevents correlation across personas and protects investigator identity.

<ins>**Network Layer Architecture:**</ins>

**Layer 1: VPN Foundation**
- **Primary VPN:** Privacy-focused provider (Mullvad, IVPN) for base anonymization
- **Secondary VPN:** Feature-rich provider (Perfect Privacy, OVPN) for advanced routing
- **Tertiary Options:** IP rotation services (Surfshark, NordVPN) for periodic changes
- **Configuration:** OpenVPN with custom configurations, WireGuard for performance

**Layer 2: Proxy Integration**
- **HTTP/HTTPS Proxies:** For web traffic routing and additional IP layer
- **SOCKS5 Proxies:** For application-specific traffic routing
- **Residential Proxies:** For account creation and high-risk activities
- **Rotating Proxies:** For automated tasks requiring IP diversity

**Layer 3: Tor Integration**
- **Tor Browser:** For maximum anonymity requirements
- **Bridge Relays:** For accessing Tor in restricted environments
- **Onion Services:** For secure communication channels
- **Custom Circuits:** For specific operational requirements

**Advanced Network Configuration:**
```bash
# Multi-hop VPN configuration example
vpn1_config = {
    "provider": "mullvad",
    "server": "se-got-wg-001",
    "protocol": "wireguard"
}

vpn2_config = {
    "provider": "perfect_privacy", 
    "server": "amsterdam",
    "protocol": "openvpn",
    "cascade": True
}

proxy_config = {
    "type": "residential",
    "rotation": "session_based",
    "geo_targeting": True
}
```

### DNS Security and Privacy

DNS queries can reveal operational activity and correlation points, requiring comprehensive DNS protection strategies.

**DNS over HTTPS (DoH) Implementation:**
- **Cloudflare DoH:** Primary DNS provider with privacy focus
- **Quad9 DoH:** Secondary DNS with malware protection
- **Custom DoH Servers:** For maximum control and privacy
- **DNS Filtering:** Block telemetry and tracking domains

**DNS Configuration Best Practices:**
```bash
# DNS over HTTPS configuration
primary_dns = "https://1.1.1.1/dns-query"
secondary_dns = "https://9.9.9.9/dns-query"
fallback_dns = "https://dns.google/dns-query"

# DNS filtering rules
block_list = [
    "*.telemetry.microsoft.com",
    "*.google-analytics.com", 
    "*.facebook.com/tr/*",
    "*.doubleclick.net"
]
```

## Browser Management and Fingerprinting

Researchers managing multiple investigation accounts need per-persona browser environments that prevent cross-account correlation through shared fingerprints; the techniques below describe how to achieve that within the bounds of authorized research.

### Anti-Detection Browser Solutions

Modern platforms analyze dozens of browser characteristics to create unique fingerprints for tracking and correlation. Professional operations require specialized browser solutions that create unique, persistent fingerprints for each persona.

:::note

Pricing and feature tiers change frequently. Check the vendor's current pricing page before relying on figures.

:::

**Commercial Anti-Detection Browsers:**

<ins>**[Multilogin](https://multilogin.com/):**</ins> ([pricing](https://multilogin.com/pricing))
- Unique browser fingerprints for each profile
- Team collaboration features
- API integration for automation
- Compliance audit trails
- Advanced profile management; metered by concurrent profiles and team seats

<ins>**[AdsPower](https://adspower.com):**</ins> ([pricing](https://www.adspower.com/pricing))
- Mass profile management capabilities
- Automation framework integration
- Team workspace functionality
- Mobile device simulation
- RPA integration support; starter, pro, and enterprise tiers

<ins>**[Octo Browser](https://octobrowser.net/):**</ins> ([pricing](https://octobrowser.net/pricing))
- Cost-effective solution for small teams
- Basic fingerprint management
- Profile synchronization
- API access for automation
- Mobile app support; tiered by profile count

<ins>**[GoLogin](https://gologin.com/):**</ins> ([pricing](https://gologin.com/pricing))
- Multi-account browser with 53 configurable fingerprint parameters
- Built-in proxy management
- Cloud profile storage and sync
- API and automation support
- Tiered by number of profiles

<ins>**[Kameleo](https://kameleo.io/):**</ins> ([pricing](https://kameleo.io/pricing))
- Anti-detect browser engineered for automation at scale
- Integrates with Puppeteer, Playwright, and Selenium
- Supports Chromium and Firefox-based profiles
- Live masking status report for detection evasion validation
- Tiered by feature set and automation access

<Highlight>**Open Source Alternatives:**</Highlight><br />

<ins>**Firefox Multi-Account Containers:**</ins>
- Free solution for basic compartmentalization
- Wide adoption in OSINT community
- Limited fingerprint management
- Good integration with other tools
- Active development community

<ins>**Chrome Profiles with Extensions:**</ins>
- Native browser profile separation
- Enhanced with privacy extensions
- Manual fingerprint management required
- Cost-effective for small operations
- Limited advanced features

### Browser Fingerprint Management

**Critical Fingerprint Components:**
- **Canvas Fingerprinting:** HTML5 canvas rendering signatures
- **WebGL Fingerprinting:** Graphics card and driver signatures
- **Audio Fingerprinting:** Audio processing characteristics
- **Font Fingerprinting:** Installed font enumeration
- **Screen Parameters:** Resolution, color depth, pixel density
- **Time Zone and Language:** Geographic and cultural indicators

**Fingerprint Randomization Strategy:**
```javascript
// Example fingerprint configuration
const fingerprintConfig = {
    canvas: {
        randomization: "per_session",
        noise_level: 0.1
    },
    webgl: {
        vendor_spoof: "Intel Inc.",
        renderer_spoof: "Intel(R) HD Graphics 620"
    },
    fonts: {
        whitelist: ["Arial", "Times New Roman", "Calibri"],
        randomize_order: true
    },
    screen: {
        resolution: "1920x1080",
        color_depth: 24,
        pixel_ratio: 1
    }
};
```

### Browser Extension Security

**Essential Privacy Extensions:**
- **uBlock Origin:** Comprehensive ad and tracker blocking
- **ClearURLs:** Remove tracking parameters from URLs
- **Decentraleyes:** Protect against CDN-based tracking
- **Canvas Blocker:** Prevent canvas fingerprinting
- **WebRTC Leak Shield:** Prevent IP address leaks

**Extension Configuration for Operational Security:**
```json
{
    "ublock_origin": {
        "enabled": true,
        "custom_filters": ["privacy", "annoyances", "malware"],
        "advanced_mode": true
    },
    "clearurls": {
        "enabled": true,
        "custom_rules": true,
        "log_cleared": false
    },
    "canvas_blocker": {
        "fake_readout": true,
        "ask_permission": false,
        "whitelist_domains": []
    }
}
```

## Communication Infrastructure

Investigation personas need dedicated email and messaging infrastructure so platform verifications, source contact, and team coordination cannot be correlated back to the investigator's real identity; the techniques below describe how to achieve that within the bounds of authorized research.

### Secure Email Management

Professional operations require dedicated email infrastructure that provides verification capabilities while maintaining operational security.

<Highlight>**Email Provider Selection Criteria:**</Highlight><br /><br />

<ins>**ProtonMail:**</ins>
- End-to-end encryption by default
- Anonymous account creation possible
- Tor-accessible web interface
- Open source client applications
- Swiss privacy jurisdiction

<ins>**Gmail:**</ins>
- Required for many platform verifications
- Advanced spam filtering
- Google service integration
- Mobile app ecosystem
- Broad platform acceptance


<Highlight>**Temporary Email Services:**</Highlight><br /><br />
- **10-Minute Mail:** Quick verifications
- **Guerrilla Mail:** Extended temporary use
- **AnonAddy:** Email forwarding and aliasing
- **SimpleLogin:** Privacy-focused forwarding

**Email Infrastructure Management:**
```python
# Email account management framework
class EmailManager:
    def __init__(self):
        self.providers = {
            'protonmail': ProtonMailAPI(),
            'gmail': GmailAPI(),
            'temp': TempEmailAPI()
        }
    
    def create_account(self, persona_id, provider='protonmail'):
        account_config = {
            'username': f"{persona_id}_{random_string(8)}",
            'recovery_email': None,
            'phone_verification': False,
            'two_factor': True
        }
        return self.providers[provider].create(account_config)
```

### Phone Number Infrastructure

Modern platforms increasingly require phone verification, making phone number infrastructure critical for successful operations.

:::warning Legal gray zone for virtual phone services

Virtual phone services (TextVerified, Silent Link, MySudo, and similar) operate in legal gray zones in many jurisdictions. Some platforms explicitly prohibit non-VoIP rentals in their ToS, and some countries restrict anonymous SIM acquisition. Verify local law and the service's terms before using, and document the authorization basis for your investigation.

:::

**Professional Phone Services:**

**[TextVerified](https://www.textverified.com/):**
- High-quality non-VoIP numbers
- Support for major platforms
- Cryptocurrency payment options
- Number rental and renewal
- API integration available

**[Silent Link](https://silent.link/):**
- Anonymous phone numbers
- No KYC requirements
- eSIM technology support
- International number options
- Privacy-focused service

**[MySudo](https://anonyome.com/):**
- Multiple identity management
- Integrated communication platform
- Privacy-focused design
- Mobile app ecosystem
- Business and personal tiers

**Phone Number Management Strategy:**
```python
class PhoneManager:
    def __init__(self):
        self.services = {
            'textverified': TextVerifiedAPI(),
            'silent_link': SilentLinkAPI(),
            'mysudo': MySudoAPI()
        }
    
    def acquire_number(self, persona_id, country_code, service='textverified'):
        number_config = {
            'country': country_code,
            'type': 'mobile',
            'duration': '30_days',
            'platforms': ['facebook', 'twitter', 'instagram']
        }
        return self.services[service].get_number(number_config)
```

### Secure Communication Channels

<ins>**Signal Messenger:**</ins>
- End-to-end encryption by default
- Disappearing messages capability
- No metadata collection
- Open source verification
- Cross-platform availability

<ins>**Session Messenger:**</ins>
- Onion routing for metadata protection
- No phone number requirements
- Decentralized architecture
- Anonymous account creation
- Advanced privacy features

<ins>**Element (Matrix Protocol):**</ins>
- Federated communication network
- End-to-end encryption
- Self-hosting capabilities
- Cross-platform compatibility
- Advanced group features

## Financial Infrastructure

Research budgets that pay for proxies, phone numbers, and antidetect browsers should not link back to the investigator's real identity, since payment trails are a common deanonymization vector. The techniques below describe how to fund authorized research operations privately.

:::warning Legitimate operational privacy only

Cryptocurrency and privacy payment tools described here are for legitimate operational privacy — keeping a research budget from linking an investigator to their personas. Using these tools to evade KYC/AML controls for fraud, sanctions evasion, money laundering, or any non-authorized purpose is illegal under most national and international financial regulations. Verify the legality of each method in your jurisdiction and document the authorization for the research spend.

:::

### Anonymous Payment Methods

Professional operations require financial infrastructure that maintains operational security while enabling service payments.

<Highlight>**Cryptocurrency Solutions:**</Highlight><br /><br />

<ins>**Monero (XMR):**</ins>
- True privacy by default
- Untraceable transactions
- Ring signatures for anonymity
- Stealth addresses
- Dynamic block sizes

<ins>**Zcash (ZEC):**</ins>
- Optional privacy features
- Shielded transactions
- Regulatory compliance options
- Selective disclosure capability
- Academic cryptography foundation

<ins>**Bitcoin with Mixing:**</ins>
- CoinJoin implementations
- Wasabi Wallet integration
- Samourai Wallet features
- Lightning Network privacy
- Coin mixing services

<Highlight>**Traditional Payment Privacy:**</Highlight><br /><br />

<ins>**Privacy.com Virtual Cards:**</ins>
- Unlimited virtual debit cards
- Spending limits and controls
- Merchant-specific cards
- Transaction monitoring
- Privacy protection features

<ins>**Prepaid Gift Cards:**</ins>
- No personal identification required
- Wide merchant acceptance
- Limited fraud protection
- Cash purchase options
- Disposal after use

### Financial Transaction Security

```python
class FinancialManager:
    def __init__(self):
        self.wallets = {
            'monero': MoneroWallet(),
            'privacy_cards': PrivacyDotComAPI(),
            'prepaid': PrepaidCardManager()
        }
    
    def create_payment_method(self, persona_id, amount, purpose):
        if purpose == 'subscription':
            return self.wallets['privacy_cards'].create_virtual_card(
                limit=amount,
                merchant_lock=True
            )
        elif purpose == 'anonymous':
            return self.wallets['monero'].create_transaction(amount)
```

## Operational Compartmentalization

### Device and Environment Isolation

**[Kasm Workspaces](https://www.kasmweb.com/):**
- Detailed explanation of Zero-Trust Web Intermediary model
- Code example showing security configuration
- OSINT-specific features and capabilities
- Team collaboration aspects

**[Exegol](https://exegol.com):**
- One minute create and destroy isolated container
- Deployment advantages for professional operations
- Tool categories for different investigation types (OSINT, AD...)

**[Qubes OS](https://www.qubes-os.org/):**
- Security-focused operating system
- Compartmentalized computing
- Hardware isolation
- Template-based VMs
- Advanced security features

**[Whonix](https://www.whonix.org/)**
- Anonymity-focused operating system
- Dual-VM architecture: Gateway routes all traffic through Tor; Workstation is isolated from the network
- Prevents IP leaks and DNS leaks by design
- Strong protection against network-level surveillance and tracking
- Ideal for privacy-critical OSINT and investigations requiring deniability

**[Tails](https://tails.net/):**
- Privacy-focused Linux distribution
- Routes all traffic through Tor network
- Leaves no traces on host computer
- Built-in privacy tools and applications
- Ideal for high-security OSINT operations

**[CSI Linux](https://csilinux.com/):**
- Specialized Linux distribution for digital forensics and OSINT
- Pre-installed investigation tools and frameworks
- Designed specifically for cybersecurity professionals
- Includes automated evidence collection capabilities
- Optimized for investigative workflows

<ins>**VMware Workstation:**</ins>
- Professional virtualization platform
- Snapshot and rollback capabilities
- Network isolation features
- Hardware abstraction
- Team collaboration tools

<ins>**VirtualBox (Open Source):**</ins>
- Free virtualization solution
- Cross-platform compatibility
- Snapshot management
- Network configuration options
- Extensive documentation

**Recommended VM Configuration:**
```yaml
vm_template:
  name: "sockpuppet_base"
  os: "Windows 10 LTSC"
  ram: "8GB"
  storage: "50GB SSD"
  network: "NAT with custom gateway"
  snapshots:
    - "clean_install"
    - "configured_base"
    - "operational_ready"
  security:
    - disable_shared_folders
    - disable_clipboard_sharing
    - enable_encryption
    - disable_usb_passthrough
```

### Data Management and Storage

**Encrypted Storage Solutions:**

<ins>**VeraCrypt:**</ins>
- Strong encryption algorithms (AES, Serpent, Twofish)
- Hidden volume capability
- Cross-platform compatibility
- Plausible deniability features
- Open source verification

<ins>**LUKS (Linux Unified Key Setup):**</ins>
- Native Linux encryption
- Multiple key slot support
- Header backup and recovery
- Performance optimization
- Integration with system tools

<ins>**BitLocker (Windows):**</ins>
- Native Windows encryption
- TPM integration
- Network unlock capability
- Recovery key management
- Enterprise integration

**File Organization Structure:**
```text
/encrypted_volume/
├── personas/
│   ├── persona_001/
│   │   ├── credentials/
│   │   ├── communications/
│   │   ├── research_notes/
│   │   └── evidence/
│   └── persona_002/
├── tools/
├── infrastructure/
└── archives/
```

### Access Control and Authentication

**Password Management:**

<ins>**KeePassXC:**</ins>
- Strong encryption (ChaCha20, AES-256)
- Cross-platform compatibility
- Browser integration
- Secure password generation
- Database sharing capabilities

<ins>**Bitwarden:**</ins>
- Cloud-based convenience
- End-to-end encryption
- Team collaboration features
- Two-factor authentication
- Self-hosting options

**Hardware Security Keys:**

<ins>**YubiKey Series:**</ins>
- FIDO2/WebAuthn support
- PIV smart card functionality
- OpenPGP implementation
- OTP generation
- USB-C and NFC options

<ins>**SoloKeys:**</ins>
- Open source hardware
- FIDO2 authentication
- Self-verification capability
- Custom firmware options
- Privacy-focused design

## Cloud Infrastructure and Services

### Secure Cloud Services

<ins>**ProtonDrive:**</ins>
- End-to-end encrypted storage
- Swiss privacy jurisdiction
- Integration with ProtonMail
- File sharing capabilities
- Cross-platform access

<ins>**SpiderOak:**</ins>
- Zero-knowledge encryption
- Cross-platform synchronization
- Version history management
- Team collaboration features
- Compliance certifications

**Self-Hosted Solutions:**

<ins>**Nextcloud:**</ins>
- Complete cloud platform
- Self-hosted deployment
- End-to-end encryption
- Collaboration features
- Extensive app ecosystem

<ins>**Seafile:**</ins>
- High-performance file sync
- Client-side encryption
- Team collaboration
- Version control
- Mobile applications

### Backup and Disaster Recovery

<ins>**3-2-1 Backup Strategy:**</ins>
- **3 copies** of critical data
- **2 different** storage media types
- **1 offsite** backup location

**Implementation Framework:**
```bash
# Automated backup script example
#!/bin/bash
BACKUP_SOURCE="/encrypted_volume/personas"
LOCAL_BACKUP="/external_drive/backups"
CLOUD_BACKUP="encrypted_cloud_storage"

# Create encrypted local backup
tar -czf backup_$(date +%Y%m%d).tar.gz "$BACKUP_SOURCE"
gpg --symmetric --cipher-algo AES256 backup_$(date +%Y%m%d).tar.gz

# Upload to secure cloud storage
rclone copy backup_$(date +%Y%m%d).tar.gz.gpg "$CLOUD_BACKUP"

# Clean up old backups (keep 30 days)
find "$LOCAL_BACKUP" -name "backup_*.tar.gz.gpg" -mtime +30 -delete
```

## Professional Platform Services

### Alternative Professional Services

:::note

Pricing and feature tiers change frequently. Check the vendor's current pricing page before relying on figures.

:::

**[Multilogin](https://multilogin.com/)** ([pricing](https://multilogin.com/pricing)):
- Browser fingerprint management
- Team collaboration features
- API integration capabilities
- Advanced automation support
- Compliance audit features; metered by concurrent profiles and team seats

**[AdsPower](https://www.adspower.com/)** ([pricing](https://www.adspower.com/pricing)):
- Mass account management
- RPA integration support
- Team workspace functionality
- Mobile device simulation
- Starter, pro, and enterprise tiers

## Infrastructure Monitoring and Maintenance

### Security Monitoring

**Network Traffic Analysis:**
```python
class SecurityMonitor:
    def __init__(self):
        self.alerts = []
        self.baseline_metrics = {}
    
    def monitor_network_traffic(self):
        # Monitor for unusual patterns
        current_metrics = self.get_network_metrics()
        anomalies = self.detect_anomalies(current_metrics)
        
        if anomalies:
            self.trigger_alert(anomalies)
    
    def detect_correlation_risks(self):
        # Check for potential correlation points
        timing_patterns = self.analyze_timing_patterns()
        ip_correlations = self.check_ip_correlations()
        behavioral_similarities = self.analyze_behavior()
        
        return {
            'timing_risks': timing_patterns,
            'ip_risks': ip_correlations,
            'behavioral_risks': behavioral_similarities
        }
```

### Performance Optimization

**System Performance Metrics:**
- CPU utilization across virtual machines
- Memory usage and optimization opportunities
- Network latency and throughput measurements
- Storage I/O performance analysis
- Application response time monitoring

**Optimization Strategies:**
- Regular system updates and security patches
- Performance tuning for critical applications
- Resource allocation optimization
- Network route optimization
- Storage cleanup and defragmentation

## Related

- [Introduction to Research Personas](./sockpuppet_01_introduction.md) — foundational concepts and authorization framing
- [Persona Development](./sockpuppet_04_persona_development.md) — how this infrastructure supports identity construction
- [Platform Tactics](./sockpuppet_06_platform_tactics.md) — platform-specific considerations that drive infrastructure choices

---


**Additional Technical Sources:**

1. [Eckersley, P. (2010). How unique is your web browser? Proceedings of the Privacy Enhancing Technologies Symposium, 1-18.](https://panopticlick.eff.org/static/browser-uniqueness.pdf)

2.  [Acar, G., Eubank, C., Englehardt, S., Juarez, M., Narayanan, A., & Diaz, C. (2014). The web never forgets: Persistent tracking mechanisms in the wild. Proceedings of the 2014 ACM SIGSAC Conference on Computer and Communications Security, 674-689.](https://dl.acm.org/doi/10.1145/2660267.2660347)

3.  [Yen, T. F., Xie, Y., Yu, F., Yu, R. P., & Abadi, M. (2012). Host fingerprinting and tracking on the web: Privacy and security implications. Proceedings of the Network and Distributed System Security Symposium.](https://www.ndss-symposium.org/ndss2012/host-fingerprinting-and-tracking-web-privacy-and-security-implications)

4.  [Torres, C. F., Jonker, H., & Mauw, S. (2015). FP-Block: Usable web privacy by controlling browser fingerprinting. European Symposium on Research in Computer Security, 3-19.](https://link.springer.com/chapter/10.1007/978-3-319-24177-7_1)

5.  [Vastel, A., Rudametkin, W., Rouvoy, R., & Blanc, X. (2018). FP-STALKER: Tracking browser fingerprint evolutions. Proceedings of the 39th IEEE Symposium on Security and Privacy, 728-741.](https://inria.hal.science/hal-01652021/document)
