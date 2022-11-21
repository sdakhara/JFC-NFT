# @author: Josh Stow (https://github.com/jshstw)

import json

IMAGE_SUFFIX = ".jpeg"

numOfFiles = 550
nextRevealNumber = 550
ipfsHash = "QmXb2dFAEwEjEVtihqS5B5DsAiCKaNU74iG8YBFqnVHhFP"
path = f"../metadata/token/{nextRevealNumber}/json/"

for n in range(nextRevealNumber - numOfFiles + 1, nextRevealNumber + 1):
  tempPath = path + str(n)
  
  with open(tempPath, "r") as f:
    data = json.load(f)
    data["image"] = f"ipfs://{ipfsHash}/{str(n)}{IMAGE_SUFFIX}"
    data["properties"].pop("files", None)
  
  with open(tempPath, "w") as f:
    f.write(json.dumps(data))