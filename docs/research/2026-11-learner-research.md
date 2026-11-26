# Learner research: getting into DevOps, platform, cloud and SRE

Date: 2026-11-26. Status: first pass, **not validated with real learners**.

This note records what we looked at before building the 90-day path, what it showed, and, just as important, what we could not check. Every claim carries a confidence label:

- **Confirmed**: read on the source page itself.
- **Reported**: stated by a secondary source or a search summary, not checked on the page.
- **Inference**: our reasoning.
- **Unknown**: we could not find out.

## Limits of this research

- The search tool returned few Reddit threads. It mostly returned Telegram mirrors of r/devops posts, dev.to, blogs and vendor pages. **We have not read the top-voted Reddit discussions.** The pain points below are therefore weaker evidence than they look.
- GitHub pages returned HTTP 403 through our proxy, so GitHub repositories were not opened. Their descriptions come from search results (reported).
- No traffic, revenue, funding or user-count data was collected. Similarweb, Crunchbase and app-store sources were not available. The competitor table is therefore **not** the full per-country comparison that a real market study needs.
- Salary and demand figures come from blogs and course sellers, who have a reason to make the career look attractive.

## What learners seem to struggle with

| Pain point                                                                                              | Evidence                                                                                                                                  | Confidence                                |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Not knowing what order to learn things in. Beginners start with Kubernetes before Linux and networking. | Several dev.to and LinkedIn posts say order matters more than the number of tools. Their orders differ after Linux.                       | Reported. The sources are opinion posts.  |
| Tutorial hell: memorising commands without building anything.                                           | A dev.to troubleshooting post describes it and suggests one small end-to-end project.                                                     | Reported. One post.                       |
| No way to show skill without a job, and "junior" listings that ask for experience.                      | A dev.to post on junior roles; our own look at job-board listings found several "junior" posts asking for Kubernetes, Terraform or CI/CD. | Reported. Informal and small.             |
| DevOps is not an entry-level role.                                                                      | Mike Pfeiffer says so in a DEV Community interview write-up and advises aiming first at an entry-level cloud engineering role.            | Confirmed on the page. One person's view. |
| Certificates versus projects.                                                                           | freeCodeCamp and an AWS Builder article recommend two to three projects. The AWS article treats certificates as support.                  | Reported. Opinion, not a study.           |
| Interviews feeling like cloud-service trivia rather than engineering.                                   | A post mirrored from r/devops.                                                                                                            | Reported. Replies not read.               |

## What already exists

| Resource                                                                  | What it is                                                                       | Cost model                                                                            | Source and confidence                           |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------- |
| roadmap.sh                                                                | Community roadmaps, a beginner guide and a DevOps project-ideas page. Open-core. | Not confirmed whether all content is free. GitHub star counts conflict between pages. | roadmap.sh pages. Reported.                     |
| KodeKloud                                                                 | Guided, structured labs and courses.                                             | Free tier gives selected labs. The full library is paid.                              | Third-party reviews. Reported.                  |
| Killercoda                                                                | Browser-based Linux and Kubernetes labs.                                         | Described as mostly free.                                                             | Third-party reviews. Reported.                  |
| iximiuz Labs                                                              | Labs on how systems work internally (containers, networking, Kubernetes).        | Partly free. One review lists a $250 one-time lifetime plan. Check the current price. | Third-party reviews. Reported.                  |
| 90DaysOfDevOps (Michael Cade, plus many forks such as TrainWithShubham's) | A daily-task curriculum on GitHub, ending in a capstone in some versions.        | Free and open source.                                                                 | Search results. Reported. Licences not checked. |
| milanm/DevOps-Roadmap                                                     | A topic-by-topic list of mostly free resources.                                  | Free.                                                                                 | Search results. Reported.                       |
| Lists of practice sites (devopscube, Linux Handbook, iximiuz)             | Curated lists of lab platforms.                                                  | Free to read.                                                                         | Pages open. Confirmed that they exist.          |

## Where we think the gap is (hypotheses, not findings)

1. **A sequence with exit criteria.** Roadmaps show topics. Lab platforms give tasks. We found no source that says, week by week, what you must have built before moving on. _Inference._
2. **Finished projects with acceptance criteria and a write-up.** Lab platforms check a task. A portfolio project needs a README, a working deployment and an incident report. _Inference._ This is the wedge the 90-day path and the three projects test.
3. **Honest guidance about the market.** Many listicles are from sellers. A page that says "this is often not a first job, and here is a stepping stone" is rarer. _Inference, from a small sample._
4. **Dated, verified pages.** The repository already requires a version, a verified date and an official source per page. We did not research whether learners value that. _Unknown._

## What we need to learn next

Following the validation order we agreed, before building more:

1. Read the actual top threads on r/devops, r/sysadmin, r/cscareerquestions and r/developersIndia for "how do I start" and "can't get a job". Count how often each pain point appears.
2. Check Google "People also ask" and autocomplete for the same questions, and use Search Console data once the site is live.
3. Collect the missing competitor facts: country, year founded, funding or revenue where public, pricing and users.
4. Put up a waitlist and a public announcement, and get at least five real people to use the 90-day path. Ask them where they got stuck and what they would pay for or recommend.
5. Decide the long-term funding model for free content (donations, sponsors, or something else) before adding anything with running costs, such as hosted labs.

## Open decisions for the maintainer

- **Positioning.** The README and the Start page focus on AI infrastructure on Kubernetes. This work adds a beginner-first path. Decide whether "beginner to portfolio" becomes the main pitch, with AI infrastructure as the advanced track.
- **Writing capacity.** There are 3 full topic pages now. The roadmap lists many more. Decide how many topics can be written and verified each week.
- **Hands-on labs.** The first version uses only local and free-tier tools. Hosted labs cost money and should wait for a funding model.
