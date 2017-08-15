---
title: The Apple FBI saga
date: 2016-03-05 00:00:00 Z
layout: link
type: link
link: http://blog.trailofbits.com/2016/02/17/apple-can-comply-with-the-fbi-court-order/
---

For a comprehensive rundown on the technical aspect on this saga, follow the link.
**TL;DR**? Continue reading the following summary.

#### The Case
In the San Bernadino shooting, FBI found an iPhone 5C of one of the gunmen. The
FBI has a search warrant to check the contents of the iPhone to build its case.

#### The Challenges
Unfortunately, the iPhone is locked with a passcode and predictably the FBI doesn't
know the passcode. So obviously someone in the FBI needs to guess the passcode
to unlock the iPhone. **Brute force!**, But it is not that simple, why?  

- iOS will completely wipe the user's data after too many incorrect attempts.  
- PIN must be entered manually, one-by-one. One cannot enter the PIN programmatically.
- iOS introduces a delay after every incorrect PIN entry.

#### What FBI is asking Apple to do?  

In lay man terms, FBI is asking Apple to build a backdoor entry by,

- Disabling the auto-erase function on that iPhone.
- Allowing unlimited incorrect attempts.
- Allowing FBI to input PIN from an external device programmatically.
- Removing the software delay for each incorrect guess.

In nutshell, FBI is asking Apple to build a custom version of iOS and install
the OS directly on the RAM without affecting the user data.

#### Is it challenging for Apple to meet FBI's demands?

**No**. But Apple is more worried that this backdoor entry (read 'custom iOS'),
if it falls into the wrong hands can lead to misuse. If you found this difficult
to comprehend, then you are better off using an Android phone! Phew!
