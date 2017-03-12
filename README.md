## LuminoCity 
### Mapping shadows cast by buildings over the course of a day 

#### Stockholm in winter
![Svenska Eko-Kartan image](https://drive.google.com/uc?export=view&id=0B0m29fs8GfgrQ1pES2Z4MlQwMzA)

#### Stockholm in summer
![Svenska Eko-Kartan image](https://drive.google.com/uc?export=view&id=0B0m29fs8GfgrLXNzZUFnT2xHVTA)

#### Description (in Swedish)
Du tittar på en karta av alla sammanlagda skuggor som producerats av tusentals byggnader Stockholm under loppet av en dag. Genom att visualisera byggnadsskuggor kan vi få insikt i hur stadens silhuett påverkar livet nere på marknivå.
Solljus och skuggor influerar inte bara gångtrafik, val av promenadsrutt eller vilka caféer och butiker som är övergivna och vilka som blomstrar. Det kan också bidra till en markant skillnad i fastighetspriser och kanske även vår hälsa.
Med hjälp av öppen data från Stockholms Stad har vi utvecklat en karta som visualiserar skuggor från byggnader i Stockholms Stad och hur de kan skilja sig åt under olika årstider. Förhoppningen är att kartan kan bidra till att stadsplanerare och beslutstagare kan få en bättre bild av stadens miljö och på så vis leda till mer informerade initiativ och positiv urban utveckling i framtiden.

## Installing

You need Python installed.

```sh
brew install python
```


Install [virtualenv](http://virtualenv.readthedocs.org/en/latest/), although it isn't strictly necessary.

```sh
pip install virtualenv
```

Clone the source, go ahead and create a new virtualenv:

```sh
git clone https://github.com/geoshepherds/h4s2017.git
cd ~/h4s2017
virtualenv venv
source venv/bin/activate
```

Then install the requirements with pip:

```sh
pip install -r /shadow_map/requirements.txt
```

## Generating HeightMap


```sh
python path/to/heightmap.py --projection epsg:3011 --geojson path/to/<buildings>.geojson --elevation-dir path/to/dir --output path/to/<name>.heightmap --save-image path/to/<name>.png 59.34413 18.09595 2 4272
```

## Generating ShadowMap

```sh
python shadow_map/render.py path/to/<name>.heightmap "2014-06-25 12:00" "2014-06-25 13:00" 60 path/to/dir
```
