Sample Tracking Dashboard
Dashboard Flow
Request Raised
      │
      ▼
Approval Workflow
      │
      ▼
Sample Collection
      │
      ▼
Barcode Generated
      │
      ▼
Transportation
      │
      ▼
Laboratory Reception
      │
      ▼
Testing
      │
      ▼
Review
      │
      ▼
Approval
      │
      ▼
Archive / Disposal
Top KPI Cards

Display at the top.

KPI	Description
Active Requests	Total open laboratory requests
Samples in Transit	Moving between locations
Samples Under Testing	Currently being analyzed
Pending Approval	Awaiting review/approval
Completed Today	Completed today
Overdue Samples	SLA exceeded
Average Turnaround Time	Request → Completion
Chain of Custody Compliance	Successfully tracked samples

Example

Requests
682

Samples
4,124

In Transit
132

Testing
286

Pending Review
91

Completed Today
73

Overdue
11

Compliance
99.7%
Sample Lifecycle Overview

Large progress visualization.

Collected

██████████

Transport

████████

Received

██████████

Testing

███████

Review

████

Approved

███

Or funnel

4200 Created

↓

4035 Collected

↓

3988 Transported

↓

3954 Received

↓

3910 Tested

↓

3872 Approved

↓

3855 Archived

Shows where bottlenecks occur.

Laboratory Request Pipeline

Kanban-style cards

New Requests

24

────────────

Awaiting Approval

15

────────────

Approved

62

────────────

Assigned

40

────────────

In Progress

18

────────────

Completed

140

Each card clickable.

Request Analytics
Request Trend

Line Chart

Daily Requests

Mon

███

Tue

██████

Wed

████████

Thu

█████
Request Categories

Pie Chart

Chemical Testing

42%

Water Analysis

18%

Environmental

16%

Microbiology

14%

Calibration

10%
Approval Workflow

Shows current approval stages.

Submitted

↓

Supervisor Approval

↓

Lab Manager

↓

QA Review

↓

Approved

Table

Request ID	Requested By	Current Approver	Waiting Since
LR1023	Production	Lab Manager	4 hrs
LR1025	QA	Supervisor	18 mins
Pending Approvals

Cards

Pending

18

Average Wait

3.8 hrs

Highest Priority

Critical

Longest Waiting

16 hrs
Task Assignment Dashboard

Shows workload.

Technician	Assigned	Active	Completed
Alice	14	5	128
Bob	10	3	96
John	16	8	140

AI Insight

Workload imbalance detected.

Recommend assigning
next requests to Bob.
Sample Tracking Table

Main table.

Sample ID	Barcode	Request	Current Stage	Location	Owner	SLA
SMP1023	QR	Water	Testing	Chemistry Lab	Alice	On Time
SMP1024	QR	Soil	Transit	Warehouse	Logistics	Delayed
SMP1025	QR	Air	Review	QA	Manager	On Time

Searchable.

Digital Chain of Custody

Timeline

09:22

Collected

↓

10:02

Packed

↓

10:35

Courier Pickup

↓

11:18

Received

↓

11:42

Testing Started

↓

13:26

Results Generated

↓

14:12

Approved

Each event includes

User
Timestamp
GPS/location (if available)
Device
Digital signature
Comments
Barcode / QR Activity

KPIs

Today's Scans

864

Successful

852

Failed

12

Duplicate

2

Average Scan

0.6 sec

Hourly chart

9AM ████

10AM ███████

11AM █████████

12PM ████
Sample Status Distribution

Pie Chart

Collected

18%

Transit

9%

Received

15%

Testing

31%

Review

17%

Completed

10%
Sample Movement Map

If multiple facilities.

Collection Site

↓

Regional Lab

↓

Testing Lab

↓

QA

↓

Storage

Interactive map if GIS is available.

SLA Monitoring

Gauge

Within SLA

96%

Overdue

4%

Table

Sample	Stage	Delay
SMP220	Testing	2 hrs
SMP441	Approval	6 hrs
Turnaround Time

Charts

Average Completion Time

Last Week

18 hrs

This Week

15 hrs

Improvement

16%

Breakdown

Collection

2 hrs

Transport

3 hrs

Testing

8 hrs

Approval

2 hrs
Workflow Bottlenecks

AI identifies delays.

Example

Testing Queue

41%

Approval Queue

28%

Transport

17%

Collection

14%

Recommendation

Increase technician
availability between
10AM–1PM.
Automated Request Management
Request Creation

Cards

Submitted Today

74

Approved

58

Rejected

4

Pending

12
Workflow Automation Status
Automatically Approved

62%

Manual Review

38%

Reason

High-value request

Needs manager approval.
Notification Center
Pending Approval

14

Samples Delayed

6

Testing Complete

22

Overdue Requests

8

Notification feed

Request LR1032 approved

Sample SMP552 reached laboratory

Testing completed

Manager review pending

SLA exceeded
Escalation Dashboard

Table

Request	SLA	Escalated To
LR1002	24 hrs	QA Manager
LR1021	12 hrs	Lab Head

Metrics

Escalations

12

Resolved

9

Pending

3
Enterprise Integration Status

Cards

LIMS

Connected

SAP

Connected

ERP

Connected

Courier API

Connected

Email

Connected

Also show

Successful Sync

99.4%

Failed Sync

0.6%
Audit Trail

This is one of the most important sections.

Table

Time	User	Action	Sample	Device
09:14	Alice	Collected	SMP221	Mobile
09:25	Bob	Received	SMP221	Scanner
10:44	QA	Approved	SMP221	Desktop

Every event should include

Timestamp
User
Department
Action
Previous Status
New Status
IP/Device
Comments
Electronic Signature
AI Operational Insights

This panel should update continuously.

Example

AI Insights

• Average sample turnaround improved by 14%.

• 7 samples are approaching SLA limits.

• Approval queue is growing faster than testing.

• Laboratory 2 has the highest request volume.

• Technician Alice processed 18% more samples than average.

• Three requests are waiting because of missing documentation.

• Barcode scan accuracy reached 99.6%.

• Transport delays increased by 9% this week.

• Predicted request volume tomorrow: 82 ± 5 requests.

• Recommend assigning additional reviewers during afternoon shifts.
Recent Activity Feed
09:12

Request LR220 submitted

09:18

Supervisor approved request

09:31

Sample collected

09:45

Barcode scanned

10:12

Received at laboratory

10:42

Testing completed

11:08

QA approved results
Global Filters
Date Range
Request ID
Sample ID
Barcode / QR Code
Customer / Department
Request Type
Sample Type
Laboratory
Collection Site
Assigned Technician
Approval Status
Current Workflow Stage
SLA Status
Priority (Critical, High, Medium, Low)
Request Source (Portal, Mobile, API)
Integration Status (LIMS/SAP)
Chain of Custody Status
Recommended Dashboard Layout
┌──────────────────────────────────────────────────────────────────────────────┐
│ KPI Cards                                                                    │
├──────────────────────────────┬───────────────────────────────────────────────┤
│ Request Pipeline             │ Sample Lifecycle Funnel                      │
├──────────────────────────────┼───────────────────────────────────────────────┤
│ Request Trends               │ Sample Status Distribution                   │
├──────────────────────────────┼───────────────────────────────────────────────┤
│ Active Sample Tracking Table │ Digital Chain of Custody Timeline            │
├──────────────────────────────┼───────────────────────────────────────────────┤
│ Task Assignment              │ Approval Workflow & Pending Approvals        │
├──────────────────────────────┼───────────────────────────────────────────────┤
│ SLA & Turnaround Analytics   │ Notifications & Escalations                  │
├──────────────────────────────┼───────────────────────────────────────────────┤
│ Audit Trail                  │ AI Insights & Enterprise Integration         │
└──────────────────────────────┴───────────────────────────────────────────────┘