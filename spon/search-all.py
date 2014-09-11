#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import re

import conf
import arpigrapher
import regex
import spon, zeit, welt, stern, faz, ntv, tagesspiegel, sueddeutsche


spon.spon()
zeit.zeit()
welt.welt()
stern.stern()
faz.faz()
ntv.ntv()
tagesspiegel.tagesspiegel()
sueddeutsche.sueddeutsche()
regex.main()

dir = conf.dir
text = conf.text


def count(word):
        count = 0
        for txt in text:
                tx = open(txt, "r").readlines()
                for a in tx:
                        if word in a:
                                count = count + 1
        return count


def title(word):
        for txt in text:
                tx = open(txt, "r").readlines()
                for a in tx:
                        if word in a:
                               print a[:-1] + (" (%s)" % txt[5:-4])

search = raw_input("Suche: ")
print "Artikel mit " + search + ": " + str(count(search))
print
arpigrapher.graph(search)
print "Schlagzeilen:"
print
title(search)