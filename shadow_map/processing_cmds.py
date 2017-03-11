python shadow_map/heightmap.py --projection epsg:3011 --geojson resources/sthlm.geojson --elevation-dir resources/ --output resources/sthlm.heightmap  --save-image resources/sthlm-6.png 59.3308 18.0673 6 1408

python shadow_map/heightmap.py --projection epsg:3011 --geojson resources/sthlm.geojson --elevation-dir resources/ --output resources/sthlm-coarse.heightmap  --save-image resources/sthlm-coarse.png 59.3308 18.0673 12 523

python shadow_map/render.py resources/sthlm-coarse.heightmap "2016-12-21 09:00" "2016-12-21 09:10" 20 shadow_map/rendered/

python shadow_map/render.py resources/sthlm2.heightmap "2016-12-21 09:00" "2016-12-21 09:30" 20 shadow_map/rendered/


WINTER
python shadow_map/render.py resources/sthlm-6.heightmap "2016-12-21 09:20" "2016-12-21 13:30" 20 shadow_map/rendered/

SUMMER
python shadow_map/render.py resources/sthlm-6.heightmap "2016-06-21 04:00" "2016-06-21 20:50" 20 shadow_map/rendered/


GDAL (150692.92078104042, 6576383.474019507, 156968.92078104042, 6582659.474019507)

gdal_translate -of GTiff -projwin 156968.92078104042 6582659.474019507 150692.92078104042 6576383.474019507 -projwin_srs EPSG:3011 shadow_map/rendered/2016-12-21.png shadow_map/rendered/winter_referenced.tif

gdal_translate -of GTiff -a_ullr 156968.92078104042 6582659.474019507 150692.92078104042 6576383.474019507 -a_srs EPSG:3011 shadow_map/rendered/2016-12-21.png shadow_map/rendered/winter_referenced2.tif

gdalwarp -of GTiff -t_srs EPSG:3857 2016-12-21_winter.tif 2016-12-21_winter_epsg3857.tif

gdal2tiles.py 2016-12-21_winter_epsg3857.tif





TESTER
coars res (156968.92078104042 6582659.474019507 150692.92078104042 6576383.474019507 )
gdal_translate -of GTiff -a_ullr 156968.92078104042 6582659.474019507 150692.92078104042 6576383.474019507 -a_srs EPSG:3011 shadow_map/rendered/2016-12-21.png shadow_map/rendered/tester-coarse-ref.tif
