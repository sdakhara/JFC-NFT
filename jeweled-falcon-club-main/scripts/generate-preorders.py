import csv

out = ""

with open("./files/preorders.csv") as f:
  reader = csv.reader(f, delimiter=",")

  for row in reader:
    for i in range(1, int(row[1])+1):
      out += f"{row[0]}, "

  out = out[:-2]

with open("./files/out/preorders.txt", "w") as f:
  f.write(out)