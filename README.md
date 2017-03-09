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
