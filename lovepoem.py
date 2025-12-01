import random

def determine_gender(token):
    """Gender from first char: f/m/n."""
    g = token[0].lower()
    if g == "f": return 0
    if g == "m": return 1
    if g == "n": return 2
    return 0


def init_lexicon():
    """Return all tables exactly like your JS version, but as Python data."""
    
    # a[g][i] and e[g][i]
    pairs = [
        # feminine
        ("Die", "e"), ("Eine", "e"), ("Jede", "e"), ("Manch'", "e"),
        ("Meine", "e"), ("Deine", "e"), ("Uns're", "e"), ("Eure", "e"),
        # masculine
        ("Der", "e"), ("Ein", "er"), ("Jeder", "e"), ("Manch'", "er"),
        ("Mein", "er"), ("Dein", "er"), ("Unser", "e"), ("Euer", "e"),
        # neuter
        ("Das", "e"), ("Ein", "es"), ("Jedes", "e"), ("Manch'", "es"),
        ("Mein", "es"), ("Dein", "es"), ("Unser", "es"), ("Euer", "es"),
    ]

    a = [[] for _ in range(3)]
    e = [[] for _ in range(3)]
    for g in range(3):
        for i in range(8):
            base = g * 8 + i
            a[g].append(pairs[base][0])
            e[g].append(pairs[base][1])

    jArr = [
        "schoen","hell","licht","warm","zärtlich","golden","befreit","offen",
        "unendlich","duftend","leuchtend","beschwingt","frei","gelöst","erhaben","befreit",
        "vollendet","rund","frisch","heilig"
    ]

    sArr = [
        "fSeele","nHerz","fFreude","fLust","fUnendlichkeit","nGlück","nJauchzen","fErfüllung",
        "mFriede","fSonne","mMond","nMeer","mWind","fBlume","fStille","fWärme",
        "fUmarmung","mHauch","mGlanz","nLeben"
    ]

    pArr = [
        "streichelt","küßt","haucht","hofft","sehnt","träumt","schwebt","atmet",
        "lebt","pulsiert","stroemt","fliegt","glüht","hoeht","stillt","belebt",
        "verglüht","beruhigt","schmeichelt","erfragt"
    ]

    oFlat = [
        "den Horizont der Stille","den Überfluß der Fülle","das Silberlicht der Sterne","das Goettliche der Ferne",
        "das Klopfen uns'rer Herzen","das warme Licht von Kerzen","die Blüte uns'rer Jahre","das Glänzen Deiner Haare",
        "mein Herz in Deiner Hand","was früher ich nie fand","den Segen stiller Stunden","das Lindern alter Wunden",
        "das Loesen kleiner Zweiheit","in's Schweben stiller Einheit","die Tiefe Deiner Augen","den Saft von schwarzen Trauben",
        "die Weichheit Deiner Lippen","die Süße dran zu nippen","die Klarheit des Gedankens","das Ende allen Wankens"
    ]
    o = [ [oFlat[i*2], oFlat[i*2+1]] for i in range(10) ]

    rFlat = [
        "fHand","nBand","fLuft","mDuft","nGlück","nStück","fFigur","fNatur","nGesicht","nGedicht",
        "mTraum","mBaum","fBlüte","fSüße","fGänze","fLenze","nLachen","nErwachen","fKühle","fGefühle",
        "fFreude","fTreue","mSaft","fKraft","fLinde","nGebinde","nKüssen","nWissen","fWeide","nGeschmeide",
        "fKrone","fWonne","nEntzücken","nEntrücken","nFinden","nBinden","nBemühen","nErblühen","nEntdecken","nWecken"
    ]
    r = [ [rFlat[i], rFlat[i+20]] for i in range(20) ]

    return a, e, jArr, sArr, pArr, o, r


def generate_poem(a, e, jArr, sArr, pArr, o, r):
    """Faithful BASIC logic, but written cleanly."""

    poem_lines = []
    headline = None

    z = 0
    while True:
        # ---- stanza start (t) ----
        s1 = random.randrange(20)
        s1_token = sArr[s1]
        g = determine_gender(s1_token)
        s1Text = s1_token[1:]

        a1 = a[g][random.randrange(8)]

        # ensure different noun
        s2 = random.randrange(20)
        while s2 == s1:
            s2 = random.randrange(20)

        s2_token = sArr[s2]
        g2 = determine_gender(s2_token)
        s2Text = s2_token[1:]

        if g2 == 0:
            a2 = "der"
            e2 = ""
        elif g2 == 1:
            a2 = "des"
            e2 = "es"
        else:  # neutron
            a2 = "des"
            e2 = "es"

        t = f"{a1} {s1Text} {a2} {s2Text}{e2}"

        # ---- v1 ----
        s3 = random.randrange(20)
        s3_token = sArr[s3]
        g3 = determine_gender(s3_token)
        s3Text = s3_token[1:]

        idx3 = random.randrange(8)
        a3 = a[g3][idx3]
        e3 = e[g3][idx3]

        j3 = jArr[random.randrange(20)]
        p3 = pArr[random.randrange(20)]

        oi = random.randrange(10)
        r1 = random.randrange(2)
        o3 = o[oi][r1]
        o5 = o[oi][1 - r1]

        v1 = f"{a3} {j3}{e3} {s3Text} {p3} {o3}"

        # ---- v2 ----
        j4i = random.randrange(20)
        while j4i == jArr.index(j3):
            j4i = random.randrange(20)
        j4 = jArr[j4i].capitalize()

        p4i = random.randrange(20)
        while p4i == pArr.index(p3):
            p4i = random.randrange(20)
        p4 = pArr[p4i]

        r4i = random.randrange(20)
        r2 = random.randrange(2)
        r4_token = r[r4i][r2]
        g4 = determine_gender(r4_token)
        r4Text = r4_token[1:]

        # lower-case first letter of a random determiner
        a_for_a4 = random.randrange(8)
        a4_raw = a[g4][a_for_a4]
        a4 = a4_raw[0].lower() + a4_raw[1:]

        r6_token = r[r4i][1-r2]
        g6 = determine_gender(r6_token)
        r6Text = r6_token[1:]
        e6 = "e" if g6 == 0 else ("er" if g6 == 1 else "es")

        v2 = f"{j4} {p4} {a4} {r4Text}"

        # ---- v3 ----
        s5 = random.randrange(20)
        while s5 == s3:
            s5 = random.randrange(20)
        s5_token = sArr[s5]
        g5 = determine_gender(s5_token)
        s5Text = s5_token[1:]

        idx5 = random.randrange(8)
        a5 = a[g5][idx5]
        e5 = e[g5][idx5]

        j5i = random.randrange(20)
        while j5i in (jArr.index(j3), j4i):
            j5i = random.randrange(20)
        p5i = random.randrange(20)
        while p5i in (pArr.index(p3), p4i):
            p5i = random.randrange(20)

        j5 = jArr[j5i]
        p5 = pArr[p5i]

        v3 = f"{a5} {j5}{e5} {s5Text} {p5} {o5}"

        # ---- v4 ----
        # pick j6, j7 distinct from earlier three
        used_js = { jArr.index(j3), j4i, j5i }

        j6i = random.randrange(20)
        while j6i in used_js:
            j6i = random.randrange(20)
        j7i = random.randrange(20)
        used_js2 = used_js | {j6i}
        while j7i in used_js2:
            j7i = random.randrange(20)

        j6 = jArr[j6i].capitalize()
        j7 = jArr[j7i]

        v4 = f"{j6}{e6}, {j7}{e6} {r6Text}"

        # ---- Save output ----
        if headline is None:
            headline = t

        poem_lines.extend([v1, v2, v3, v4])

        z += 1
        if z >= 4:
            break

    return headline, "\n".join(poem_lines)


# ---- RUN ----
a, e, jArr, sArr, pArr, o, r = init_lexicon()
headline, body = generate_poem(a, e, jArr, sArr, pArr, o, r)
print(headline)
print()
print(body)
