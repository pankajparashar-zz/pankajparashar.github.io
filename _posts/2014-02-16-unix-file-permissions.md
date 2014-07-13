---
layout: post
title: Unix file permissions
type: post
excerpt: I have used Unix for the major portion of my professional career, yet I have always failed to understand the intricacies surrounding the file permissioning system. This article is an attempt to dig deep and augment my understanding about them.

---

The file permissions on a typical Unix system looks like this,

<pre class="language-bash"><code>$ ls -ld /usr/bin /usr/bin/cat
drwxrwxr-x   3 root     bin         8704 Sep 23  2004 /usr/bin
-r-xr-xr-x   1 bin      bin         9388 Jul 16  1997 /usr/bin/cat</code></pre>

The Unix file permissions can be visualized in two forms,

1. Symbolic mode
2. Octal mode

<pre class="language-bash"><code>> SYMBOLIC MODE
-  --- --- ---
|   |   |   |
|   |   |   └── -- rw(x/t/T) for others (o)
|   |   └── ------ rw(x/s/S) for groups (g)
|   └── ---------- rw(x/s/S) for a user (u)
└── -------------- file type: regular (-)
                              directory (d)
                              character special (c)
                              block special (b)
                              fifo (p)
                              symbolic link (l)
                              socket (s)</code></pre>

### 1. Symbolic mode

In bit mode, the permissions are represented using the characters `r`, `w`, `x`, `s`, `S`, `t`, `T`. The table below expands more on what each character stands for,

<pre class="language-bash"><code>r -> Read
w -> Write
x -> Execute

s -> Execute bit is ON and Set UID/GID bit is ON
S -> Execute bit is OFF and Set UID/GID bit is ON

t -> Execute bit is ON and Sticky bit is ON
T -> Execute bit is OFF and Sticky bit is ON</code></pre>

When a specific permission for a file doesn't apply to any of the user/group/other, Unix uses the default character `-` to represent the lack of permission.

For example,

<pre class="language-bash"><code>-r-xr-xrwx   1 joe      bin         9388 Jul 16  1997 /usr/bin/cat</code></pre>

Joe has read/write/execute permissions on the file `/usr/bin/cat`. However, all the other users of the group `bin` to which Joe belongs have read and execute permissions only. All other users outside the group `bin` can also read and execute that file.

> The `root` user is special. `root` is granted `rwx` to all directories and `rw` to all files. On a file, if any of the 3x bits are set, then root has execute permission. This special permission is often disabled on network mounted filesystems.

### 2. Octal mode

<pre class="language-bash"><code>> OCTAL MODE
0   0   0   0
|   |   |   |
|   |   |   └── -- r(4), w(2), x(1) for others (o)
|   |   └── ------ r(4), w(2), x(1) for groups (g)
|   └── ---------- r(4), w(2), x(1) for a user (u)
└── -------------- suid(4), sgid(2), sticky(1)</code></pre>

In the octal mode, the permissions are defined by 4-octal digits. The value for each of the last three digits can be computed as follows,

<pre class="language-bash"><code>421
rwx

2^0 = 1 –> eXecute
2^1 = 2 –> Write
2^2 = 4 -> Read

+-----+---+--------------------------+
| rwx | 7 | Read, write and execute  |
| rw- | 6 | Read, write              |
| r-x | 5 | Read, and execute        |
| r-- | 4 | Read,                    |
| -wx | 3 | Write and execute        |
| -w- | 2 | Write                    |
| --x | 1 | Execute                  |
| --- | 0 | no permissions           |
+------------------------------------+

+------------+------+-------+
| Permission | Octal| Field |
+------------+------+-------+
| rwx------  | 700  | User  |
| ---rwx---  | 070  | Group |
| ------rwx  | 007  | Other |
+------------+------+-------+</code></pre>

The first digit also follows the same principle,

<pre class="language-bash"><code>suid = 4
sgid = 2
sticky = 1</code></pre>

When a specific permission for a file doesn't apply to any of the user/group/other, Unix uses `0` to represent the absence of all permissions for the corresponding user/group/other.

For example,

<pre class="language-bash"><code>4755
----

4 = Set UID bit is ON.
7 = read(4) + write(2) + execute(1) permissions for the user.
5 = read(4) + execute(1) permissions for group members.
5 = read(4) + execute(1) permissions for other members outside the group.</code></pre>

If the first of the four digits is `0` then it means that the file doesn't have any of the setuid, setgid or sticky bit present on it. Generally, the leading `0` can be omitted.

### The Special Bits  

1. Set UID and Set GID bits

Apart from the usual `rwx` bits, the UNIX permission system also has the `s` bit which stands for SetUID for user or SetGID for group. For a file, if this bit is defined, then the `x` is turned into `s` for the corresponding user/group/others. For example,

<pre class="language-bash"><code>$ ls -l /etc/passwd /etc/shadow /usr/bin/passwd
-r--r--r--   1 root     sys        14006 Jan 14 11:17 /etc/passwd
-r--------   1 root     sys         8281 Jan 14 11:18 /etc/shadow
-r-sr-sr-x   3 root     sys        96244 Sep  5  2001 /usr/bin/passwd</code></pre>

The `/etc/passwd` file is writable only by `root`. The `/etc/shadow` file is where the passwords are stored and cannot be read by ordinary users.  

But `joe` wants to change his password. He can do that by running `/usr/bin/passwd`. Notice those `r-s` permissions. The passwd program has the suid and sgid bits set. This turns the x's into s's. The passwd program is owned by `root`. When `joe` runs it, it does not run as `joe`. Instead, it runs as it owner which is `root`.  

So the passwd program can change joe's password for him. The sgid bit works the same way, except it causes the passwd program to run with the group `sys` instead of joe's group. The suid and sgid do not get their own position in the `ls`. When the suid bit is set, `ls` displays a `s` rather than a `x` for the owner execute permission. 

2. The Sticky Bit

If the sticky bit is set on a directory, mere write permission on the directory is no longer enough to remove the files. You must additionally own the file or own the directory. 

> The `root` user continues to be able to delete files from any directory regardless of the permissions. 

The sticky bit affects the `other` execute bit in the `ls` display. Except that it uses `t` and `T` rather than `s` and `S`. For example,

<pre class="language-bash"><code>drwxrwxrwt   5 root       root          1024 Feb 11 20:43 /tmp</code></pre>

In that `/tmp` directory above, anyone can create new files. But because of the sticky bit, one user cannot delete another user's files.

Some examples using special bits,

<pre class="language-bash"><code>+-------------------+
| rwxrwxrwx     777 | all permissions granted
| rwxr-xr-x     755 | group and others read & executable
| rwx------     700 | private file
| rwsr-xr-x    4755 | set UID
| rwxr-sr-x    2755 | set GID
| rwxr-xr-t    1755 | sticky bit
| rwSw-xr-x    4655 | setUID but not executable by user
| rwxr-Sr-x    2745 | getGID, but not executable by group members
| rwxr-xr-T    1754 | sticky bit, but not executable by others
+-------------------+</code></pre>

### Special cases  
<br>
**What do `rwx` really mean for a file?**  
For a file, `r` and `w` permissions are self-explanatory. The `x` permission means that the user can run the file which either is an output from a compiler or a shell script. 

**What do `rwx` really mean for a directory?**  
For a directory, things are a little more complex. A directory is a file too, and `r` permission means you can read it. With `w` permission you can create new files in the directory or remove old files.   

> It sometimes surprises people that you can remove a file which you cannot read. The unix `rm` command will test for that and issue a warning, but you can suppress that warning with `-f`. And `rmdir` will not even bother to check at all.  

But you really cannot do very much without `x` permission. With directories, you usually have both read and execute permissions or neither. On a directory, `x` is officially called "search permission". You need `x` to use a directory in a pathname. So if you try `cat /etc/passwd`, you will need `x` on `/` and `/etc`. You also need `x` to cd into a directory.   

Case 1 - Only `r` permission on a directory  
You can use `ls` to list the file names. But `ls -l` will not work. 

Case 2 - Only `w` permission on a directory  
This is completely useless and grants nothing at all.

Case 3 - Only `x` permission on a directory  
When you have `x` permission but no `r` permission on a directory then you can open files in the directory if you happen to know the file's name. You can `cd` into the directory but cannot create a new file. Adding write permission will allow you to create files. And you can then delete files if you happen to know their name.

### How to get octal permissions for a file?

File permissions in Linux can be displayed in octal format using Linux `stat` command. 

<pre class="language-bash"><code>$ stat -c '%A %a %n' *
[Replace * with the relevant directory or the exact filename]

$ man stat
-c  --format=FORMAT
             use  the  specified  FORMAT instead of the default; output a newline after
            each use of FORMAT
%A  Access rights in human readable form          
%a  Access rights in octal
%n  File name</code></pre>

### The umask command

When a user creates a file or directory, it gets a default set of permissions. The user file-creation mode mask (`umask`) is used to determine the file permissions for newly created files. It can be used to control the default file permission for new files. It is a four-digit octal number. A umask can be set or expressed using:

* Symbolic values
* Octal values

**Symbolic values**  

A umask set to `u=rwx,g=rwx,o=` will result in new files having the modes `-rw-rw----`, and new directories having the modes `drwxrwx---`.

<pre class="language-bash"><code>$ umask u=rwx,g=rwx,o=
$ umask
0007
$ mkdir foo
$ touch bar
$ ls -l
drwxrwx--- 2 dave dave 512 Sep 1 20:59 foo
-rw-rw---- 1 dave dave 0   Sep 1 20:59 bar</code></pre>

**Octal values**  

The octal notation for the permissions masked out are,

<pre class="language-bash"><code>0 – Full permissions (Read, Write, Execute)
1 – Write and read
2 – Read and execute
3 – Read only
4 – Write and execute
5 – Write only
6 – Execute onlyadminadmin
7 – No permissions

$ umask 022
$ mkdir foo
$ touch bar
$ ls -l
drwxr-xr-x 2 dave dave 512 Aug 18 20:59 foo
-rw-r--r-- 1 dave dave 0   Aug 18 20:59 bar</code></pre>

Though umask value is the same for files and folders, but the calculation of file base permissions and directory base permissions are different.

> The minimum and maximum `umask` value for a folder is `000` and `777`. The minimum and maximum `umask` value for a file is `000` and `666`. This is because only scripts and binaries should have execute permissions, normal and regular files should have just read and write permissions. Directories require execute permissions for viewing the contents in it, so they can have `777` as permissions.

**How the actual permissions are calculated from umask?**

Suppose the umask value is `027`.

- For directories, the permission is derived by doing octal subtraction of `027` from the maximum possible value, `777`. So the directory permission is `750` when its created. Owner will get full permission, group gets execute and write permissions and others no permissions.
- For files, the permission is derived by doing octal subtraction of `027` from the maximum possible value, `666`. So the file permission is `640` when its created. Owner will get read & write permission, group gets read permission only, and others no permissions.

**Find out the default umask**

<pre class="language-bash"><code>$ umask
0022</code></pre>

The preceding `0` indicates there is no SUID/SGID/Sticky bit information set.

**Some FAQ related to umask**

1) How to set or change default `umask` for all the new users? The `umask` value can be set in `/etc/profile` for all the new users. 

2) How to set or change default `umask` for existing users? For existing users you can edit `~/.bashrc` file in their home directory.

**Changing permissions with chmod**

The `chmod` command in Unix is abbreviated as **CH**ange **MOD**e. Chmod command is used to change permission for files and directories in Unix. 

1) Symbolic method like `chmod +x filename`.

<pre class="language-bash"><code>The who part can be:
u  (user)
g  (group)
o  (other)
a  (all)
   (whatever is allowed by umask (subset of all))

The operator can be  = or - or +
= (set bits to bitlist)
- (subtract bitlist from current bit
+ (add bitllist to current bits)

The bitlist can be one of the following letters:
r (read permission)
w (write permission)
x (execute permision)
X (conditional execute permision)
u (current permissions for user)
g (current permissions for group)
o (current permissions for others)
s (set uid or set gid)
t (sticky bit)</code></pre>

2) Octal method like `chmod 775 filename`.

Let us review some examples in both symbolic and octal representaions for files.

<pre class="language-bash"><code>+------------------------+-----------+
| chmod u=rwx,g=rwx,o=rx | chmod 775 |
| chmod u=rwx,g=rx,o=    | chmod 750 |
| chmod u=rw,g=r,o=r     | chmod 644 |
| chmod u=rw,g=r,o=      | chmod 640 |
| chmod u=rw,go=         | chmod 600 |
| chmod u=rwx,go=        | chmod 700 |
+------------------------+-----------+</code></pre>
