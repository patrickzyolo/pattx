
#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import re
import regex
import spon, zeit, welt, stern, faz


spon.spon()
zeit.zeit()
welt.welt()
stern.stern()
faz.faz()
regex.main()

text = ["news-spon.txt", "news-welt.txt", "news-zeit.txt", "news-stern.txt"]

#most = open("woerter-der-woche.txt", "w+")

def find(word):
	count = 0
	for txt in text:
		tx = open(txt, "r").readlines()
		for a in tx:
			if word in a:
				count = count + 1
	return count


bad = ["um", "an", "von", "in", "den", 
       "im", "die", "mit", "bei", "sich", 
       "des", "Die", "der", "ab", "am",
       "-", "und", "auf", "zum", "Der", 
       "vor", ":", "ist", "zum", "eine", "zu", "aus", 
       "ein", "er", "ich", "so", "es", "ter", "zur", 
       "Ja", "in", "Ab", "Im", "dem", "ja", "wer", "du", "ein",
       "er", "war", "Er", "tun", "als", "hin", "los", "In",
       "Ein", "wird", "So", "La", "wir", "Eine", "Das", "Wir",
       "nun", "sind", "ins", "nun", "auch", "+++", "+++:",
       "nicht", "noch", "ohne", "seit", "letzte", "neu", 
       "Diese", "diese", "Auf", "Wo", "Sie", "immer", "einer",
       "Neue", "of", "m", "Aus", "nach", "fuer", "ueber", "T",
       "UeBERSICHT", "unter", "per", "cu", "das", "1", "will", "wie"]


def words():
	list = {}
	for txt in text:
		tx = open(txt, "r").readlines()
        
		for b in tx:
			b = b
			for c in b.split():
				if c not in bad:
					if find(c) >= 2:
						if ":" in c: c = c[:-1]
#						print c + ":  " + str(find(c))
						list.update({c:find(c)})
	for l in list:
		if list[l] > 6:
			print l + ": " + str(list[l])
#			most.write(l + ": " + str(list[l]) + "\n")
words()
