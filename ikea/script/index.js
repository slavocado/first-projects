'use strict';

import {catalog} from "./catalog.js";
import generateCatalog from "./generateCatalog.js";
import generateFooter from "./generateFooter.js";
import generateHeader from "./generateHeader.js";
import generateSubCatalog from "./generateSubCatalog.js";


generateHeader();
generateFooter();
generateCatalog();
generateSubCatalog();
catalog();