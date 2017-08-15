---
title: Introducing Pandas
date: 2015-11-08 00:00:00 Z
layout: post
type: post
excerpt: The intent of this post is to introduce you to the Pandas library by performing
  common tasks like reading, writing files and manipulating data.
---

[Pandas](http://pandas.pydata.org/) is an open source Python library that provides
an easy-to-use data structure to perform complex operations with the data. Following
are some of the ways to get you up and running with Pandas,

{% highlight sh %}
$ pip install pandas
{% endhighlight %}

Once you have finished the installation, you could verify the package by running
the following command,

{% highlight python %}
>>> import pandas as pd
>>> pd.__version__
u'0.17.0'
{% endhighlight %}

- Construct a random Pandas dataframe (uses NumPy)

{% highlight python %}
>>> import numpy as np
>>> df = pd.DataFrame(np.random.randn(2,1), columns=['ColA'])
>>> df
       ColA
0 -0.585067
1 -1.387787
{% endhighlight %}

- Construct a dataframe with a list of tuples

{% highlight python %}
>>> data = [(1,2,3), (4,5,6),]
>>> df = pd.DataFrame(data, columns=['ColA', 'ColB', 'ColC'])
>>> df
   ColA  ColB  ColC
0     1     2     3
1     4     5     6
{% endhighlight %}

- Construct a dataframe from a CSV file

{% highlight python %}
>>> df = pd.read_csv('file.csv')
>>> df
         Date    price  factor_1  factor_2
0  2012-06-11  1600.20     1.255     1.548
1  2012-06-12  1610.02     1.258     1.554
{% endhighlight %}

- Construct a dataframe from a Excel(.xlsx) file

{% highlight python %}
>>> xlsFile = pd.ExcelFile('file.xlsx')
>>> xlsFile.sheet_names
['Sheet1', 'Sheet2']
>>> df = xls_file.parse('Sheet1')
>>> df
         Date    price  factor_1  factor_2
0  2012-06-11  1600.20     1.255     1.548
1  2012-06-12  1610.02     1.258     1.554
{% endhighlight %}

- Add, Remove and Rename a column in a dataframe

{% highlight python %}
>>> df
   ColA  ColB  ColC
0     1     2     3
1     4     5     6

#: Add column(s)
>>> df.insert(loc=3, column='ColD', value='NewVal')
>>> df
   ColA  ColB  ColC    ColD
0     1     2     3  NewVal
1     4     5     6  NewVal

#: Rename column(s)
>>> df.rename(columns={'ColD': 'ColE'}, inplace=True)
>>> df
   ColA  ColB  ColC    ColE
0     1     2     3  NewVal
1     4     5     6  NewVal

#: Remove column(s)
>>> df.drop(labels=['ColE'], axis=1, inplace=True)
>>> df
   ColA  ColB  ColC
0     1     2     3
1     4     5     6
{% endhighlight %}

- Insert, Update and Delete rows from a dataframe

{% highlight python %}
>>> df
   ColA  ColB  ColC
0     1     2     3
1     4     5     6

#: Insert row(s) at the end
>>> idx = len(df)
>>> df.loc[idx] = [7,8,9]
>>> df
  ColA ColB ColC
0    1    2    3
1    4    5    6
2    7    8    9

#: Update row(s) based on criterion
>>> df.loc[  df.ColB%2 == 0,  'ColC'  ] = 10
>>> df
   ColA  ColB  ColC
0     1     2    10
1     4     5     6
2     7     8    10

#: Delete row(s) based on criterion
>>> df = df[  df.ColC == 10  ]
>>> df
   ColA  ColB  ColC
0     1     2    10
2     7     8    10
{% endhighlight %}


Of course, Pandas is a huge library and this article would never be considered complete.
As I continue to learn new tricks in the Pandas library, I will update the article
immediately. So make sure you bookmark this post for future reference!
