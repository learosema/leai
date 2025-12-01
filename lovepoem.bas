1 REM LOVEPOEM.ART
5 MODE 1:BORDER 1:INK 0,1:INK 1,24:INK 2,20:INK 3,6
10 GOSUB 60010
20 DIM a$(2,7),e$(2,7),j$(19),s$(19),p$(19),o$(9,1),r$(19,1),x$(19)
30 RANDOMIZE TIME
40 GOSUB 10010
1000 s1=INT(RND(1)*20)
1010 x$=s$(s1)::GOSUB 20010:s1$=MID$(s$(s1),2)
1020 a=INT(RND(1)*8):a1$=a$(g,a)
1030 s2=INT(RND(1)*20):IF s2=s1 GOTO 1030
1040 x$=s$(s2):x=s2:GOSUB 20010:s2$=MID$(s$(s2),2)
1050 a2$="des":IF g=0 THEN a2$="der"
1060 e2$="es":IF g=0 THEN e2$=""
1100 t$=a1$+" "+s1$+" "+a2$+" "+s2$+e2$
2000 s3=INT(RND(1)*20)
2010 x$=s$(s3):GOSUB 20010:s3$=MID$(s$(s3),2)
2020 a=INT(RND(1)*8):a3$=a$(g,a):e3$=e$(g,a)
2030 j3=INT(RND(1)*20):j3$=j$(j3)
2040 p3=INT(RND(1)*20):p3$=p$(p3)
2050 o3=INT(RND(1)*10):r1=INT(RND(1)*2)
2060 o3$=o$(o3,r1):o5$=o$(o3,(1 XOR r1))
2100 v1$=a3$+" "+j3$+e3$+" "+s3$+" "+p3$+" "+o3$
3000 j4=INT(RND(1)*20):IF j4=j3 GOTO 3000
3010 j4$=CHR$(ASC(j$(j4))-32)+MID$(j$(j4),2)
3020 p4=INT(RND(1)*20):IF p4=p3 GOTO 3020
3030 p4$=p$(p4)
3040 r4=INT(RND(1)*20):r2=INT(RND(1)*2)
3050 x$=r$(r4,r2):GOSUB 20010:r4$=MID$(r$(r4,r2),2)
3060 a=INT(RND(1)*8):a4$=CHR$(ASC(a$(g,a))+32)+MID$(a$(g,a),2)
3070 x$=r$(r4,(1 XOR r2)):GOSUB 20010:r6$=MID$(r$(r4,(1 XOR r2)),2)
3080 e6$="e":IF g=1 THEN e6$="er"
3090 IF g=2 THEN e6$="es"
3100 v2$=j4$+" "+p4$+" "+a4$+" "+r4$
4000 s5=INT(RND(1)*20):IF s5=s3 GOTO 4000
4010 x$=s$(s5):GOSUB 20010:s5$=MID$(s$(s5),2)
4020 a=INT(RND(1)*8):a5$=a$(g,a):e5$=e$(g,a)
4030 j5=INT(RND(1)*20):IF j5=j4 OR j5=j3 GOTO 4030
4040 p5=INT(RND(1)*20):IF p5=p4 OR p5=p3 GOTO 4040
4050 j5$=j$(j5):p5$=p$(p5)
4100 v3$=a5$+" "+j5$+e5$+" "+s5$+" "+p5$+" "+o5$
5000 j6=INT(RND(1)*20):IF j6=j3 OR j6=j4 OR j6=j5 GOTO 5000
5010 j7=INT(RND(1)*20):IF j7=j3 OR j7=j4 OR j7=j5 OR j7=j6 GOTO 5010
5020 j6$=CHR$(ASC(j$(j6))-32)+MID$(j$(j6),2):j7$=j$(j7)
5100 v4$=j6$+e6$+", "+j7$+e6$+" "+r6$
6000 IF z=0 THEN PRINT #8,t$:PRINT #8:PRINT #8
6010 PRINT #8,v1$
6020 PRINT #8,v2$
6030 PRINT #8,v3$
6040 PRINT #8,v4$
6050 PRINT #8:z=z+1:IF z<4 GOTO 2000
6060 END
10000 REM >Lexikon lesen<
10010 FOR j=0 TO 2:FOR i=0 TO 7:READ a$(j,i),e$(j,i):NEXT i:NEXT j
10020 FOR j=0 TO 19:READ j$(j):NEXT j
10030 FOR j=0 TO 19:READ s$(j):NEXT j
10040 FOR j=0 TO 19:READ p$(j):NEXT j
10050 FOR j=0 TO 9:FOR i=0 TO 1:READ o$(j,i):NEXT i:NEXT j
10060 FOR j=0 TO 19:FOR i=0 TO 1:READ r$(j,i):NEXT i:NEXT j
10070 RETURN
20000 REM >Bestimmung des Genus<
20010 IF LEFT$(x$,1)="f" THEN g=0
20020 IF LEFT$(x$,1)="m" THEN g=1
20030 IF LEFT$(x$,1)="n" THEN g=2
20040 RETURN
50000 REM >Lexikon<
50010 DATA Die,e,Eine,e,Jede,e,Manch',e,Meine,e,Deine,e,Uns're,e,Eure,e
50020 DATA Der,e,Ein,er,Jeder,e,Manch',er,Mein,er,Dein,er,Unser,e,Euer,e
50030 DATA Das,e,Ein,es,Jedes,e,Manch',es,Mein,es,Dein,es,Unser,es,Euer,es
50040 DATA schoen,hell,licht,warm,z{rtlich,golden,befreit,offen,unendlich,duftend,leuchtend,beschwingt,frei,geloest,erhaben,befreit,vollendet,rund,frisch,heilig
50050 DATA fSeele,nHerz,fFreude,fLust,fUnendlichkeit,nGl}ck,nJauchzen,fErf}llung,mFriede,fSonne,mMond,nMeer,mWind,fBlume,fStille,fW{rme,fUmarmung,mHauch,mGlanz,nLeben
50060 DATA streichelt,k}~t,haucht,hofft,sehnt,tr{umt,schwebt,atmet,lebt,pulsiert,stroemt,fliegt,gl}ht,hoeht,stillt,belebt,vergl}ht,beruhigt,schmeichelt,erfragt
50070 DATA den Horizont der Stille,den ]berfu~ der F}lle,das Silberlicht der Sterne,das Goettliche der Ferne,das Klopfen uns'rer Herzen,das warme Licht von Kerzen,die Bl}te uns'rer Jahre,das Gl{nzen Deiner Haare
50080 DATA mein Herz in Deiner Hand,was fr}her ich nie fand,den Segen stiller Stunden,das Lindern alter Wunden,das Loesen kleiner Zweiheit,in's Schweben stiller Einheit
50090 DATA die Tiefe Deiner Augen,den Saft von schwarzen Trauben,die Weichheit Deiner Lippen,die S}~e dran zu nippen,die Klarheit des Gedankens,das Ende allen Wankens
50100 DATA fHand,nBand,fLuft,mDuft,nGl}ck,nSt}ck,fFigur,fNatur,nGesicht,nGedicht,mTraum,mBaum,fBl}te,fS}~e,fG{nze,fLenze,nLachen,nErwachen,fK}hle,fGef}hle
50110 DATA fFreude,fTreue,mSaft,fKraft,fLinde,nGebinde,nK}ssen,nWissen,fWeide,nGeschmeide,fKrone,fWonne,nEntz}cken,nEntr}cken,nFinden,nBinden,nBem}hen,nErbl}hen,nEntdecken,nWecken
60000 REM > Umlaute <
60010 SYMBOL AFTER 91
60020 SYMBOL 91,66,24,60,102,126,102,102,0 
60030 SYMBOL 92,130,56,108,198,198,108,56,0
60040 SYMBOL 93,66,0,102,102,102,102,60,0
60050 SYMBOL 123,68,0,120,12,124,204,118,0
60060 SYMBOL 124,36,0,60,102,102,102,60,0
60070 SYMBOL 125,36,0,102,102,102,102,62,0
60080 SYMBOL 126,60,102,124,102,102,102,108,96
60090 RETURN
