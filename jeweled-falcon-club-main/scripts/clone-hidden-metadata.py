"""
@author: Josh Stow (https://github.com/jshstw)
"""

import json

PATH = "../metadata/token/hidden/json/"
TOTAL_FILES = 9990
IMAGE_URI = "ipfs://QmNVsexBSZqirLWSwhHiTo3Qza19HmFrPtpZ4cyi2PfMyG"

for i in range(1, TOTAL_FILES+1):
  tempPath = PATH + str(i)

  with open(tempPath, "w") as f:
    f.write(json.dumps(
      {
        "name": f"Jeweled Falcon #{i}",
        "image": IMAGE_URI,
        "description": "9,990 hand drawn generative art NFTs & 10 1/1 Ultimate Edition NFTsJeweled Falcon Club has been created by Forevercorp Digital - part of the Forevercorp group of companies positively disrupting, innovating & developing the markets for investment in diamonds & other gemstones and precious metals.Holders of Jeweled Falcon Club NFTs automatically become members of the Club.The Jeweled Falcon Club provides exclusive benefits & rewards to members including access to a metaverse diamond & gemstone atelier to be created by Forevercorp Digital and loyalty rewards available through Forevercorp Digital's revenue-linked sponsorship of the club. Full details are set out in the litepaper & roadmap at www.jeweledfalconclub.com",
        "attributes": [
          {
            "trait_type": "Visibility",
            "value": "Hidden"
          }
        ],
        "external_url": "https://jeweledfalconclub.com/"
      }
    ))