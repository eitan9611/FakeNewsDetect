import os
import logging
import warnings

# Set environment variables
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_DISABLE_SIGNALLING_NAN'] = '1'

# Configure logging
logging.getLogger('tensorflow').setLevel(logging.ERROR)
warnings.filterwarnings('ignore')