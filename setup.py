# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in dernetz/__init__.py
from dernetz import __version__ as version

setup(
	name='dernetz',
	version=version,
	description='Customise ERP For Energy Broker',
	author='Tech Innovators',
	author_email='techinnovatorssurat@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
