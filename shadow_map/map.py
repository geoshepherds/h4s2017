import pickle
import pdb


class Map(object):
    def __init__(self, lat, lng, resolution, size, proj):
        self.lat = lat # Center latitude
        self.lng = lng # Center longitude
        self.resolution = resolution
        self.size = size
        self.psize = size * resolution
        # performs cartographic transformations (converts from longitude,latitude to native map projection x,y coordinates and vice versa)
        self.proj = proj
        cx, cy = proj(lng, lat, errcheck=True)

        self.bounds = (
            cx - self.psize / 2,
            cy - self.psize / 2,
            cx + self.psize / 2,
            cy + self.psize / 2,
        )
        # pdb.set_trace()
        w, s = proj(self.bounds[0], self.bounds[1], inverse=True)
        e, n = proj(self.bounds[2], self.bounds[3], inverse=True)

        self.ll_bounds = (s, w, n, e)

    def _latLngToIndex(self, lat, lng):

        # x, y = self.proj(lng, lat,)

        feature_bounds = (
            (lng - self.bounds[0]) / self.psize * self.size,
            (lat - self.bounds[1]) / self.psize * self.size
        )

        # pdb.set_trace()
        return feature_bounds

    def save(self, f):
        pickle.dump(self, f, pickle.HIGHEST_PROTOCOL)

    @staticmethod
    def load(f):
        return pickle.load(f)
