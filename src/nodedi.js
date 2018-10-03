let _config = new WeakMap();
let _resources = new WeakMap();
let _privateProperties = new WeakMap();

class DI {
    constructor(config = {}) {
        let defaults = {
            autoload: false,
            modulePath: ''
        };

        let privateProperties = {
            version: process.env.npm_package_version
        };

        _config.set(this, Object.assign(defaults, config));
        _privateProperties.set(this, privateProperties);
        _resources.set(this, {});
    }

    setConfig(config) {
        _config.set(this, Object.assign(_config.get(this), config));
    }

    getConfig() {
        return _config.get(this);
    }

    getConfigKey(key) {
        return _config.get(this)[key];
    }

    has(resourceName) {
        return (typeof _resources.get(this)[resourceName] !== 'undefined');
    }

    isStored(resourceName) {
        return (typeof _resources.get(this)[resourceName] !== 'undefined');
    }

    set(resourceName, resource) {
        let resources = _resources.get(this);
        resources[resourceName] = resource;
        _resources.set(this, resources);
    }

    get(resourceName) {
        let resources = _resources.get(this);

        if (this.isStored(resourceName)) {
            return resources[resourceName];
        } else {
            if (this.getConfig().autoload) {
                let parameterResource = this.getParametersResource(resourceName);
                if (typeof parameterResource !== 'undefined') return parameterResource;

                let functionResource = this.getFunctionResource(resourceName);
                if (typeof functionResource !== 'undefined') return functionResource;

                let serviceResource = this.getServiceResource(resourceName);
                if (typeof serviceResource !== 'undefined') return serviceResource;

                // try to load a installed dependency or a native node module
                try {
                    return require(resourceName);
                } catch (e) {
                    throw new Error('can\'t require ' + resourceName + ' as native node module');
                }
            } else {
                // If resource is not found and autoload is false
                return undefined;
            }
        }
    }

    getParametersResource(resourceName) {
        let parametersDefinition = this.getConfigKey('parameters');
        if (resourceName.includes('%')) {
            resourceName = resourceName.replace(/%/g, '');
            if (typeof parametersDefinition !== 'undefined' && typeof parametersDefinition[resourceName] !== 'undefined') {
                return parametersDefinition[resourceName];
            } else {
                throw new Error('Parameter ' + resourceName + ' not found in parameter config');
            }
        }
        return undefined;
    }

    getFunctionResource(resourceName) {
        let functionDefinition = this.getConfigKey('functions');
        if (typeof functionDefinition !== 'undefined' && typeof functionDefinition[resourceName] !== 'undefined') {
            if (typeof functionDefinition[resourceName] === 'function') {
                return functionDefinition[resourceName];
            } else {
                throw new Error(resourceName + ' has no an executable function in function definition');
            }
        }
        return undefined;
    }

    getServiceResource(resourceName) {
        let resourceType;
        let modulePath = this.getConfigKey('modulePath');
        let serviceDefinition = this.getConfigKey('services');
        if (resourceName.includes('@')) {
            resourceType = 'Instance';
            resourceName = resourceName.replace(/@/g, '');
        }
        if (typeof serviceDefinition !== 'undefined' && typeof serviceDefinition[resourceName] !== 'undefined') {
            let resourceConfig = serviceDefinition[resourceName];
            let shallBeStored = typeof resourceConfig['shared'] === 'undefined' ? false : resourceConfig['shared'];
            if (resourceType === 'Instance') {
                let object = this.objectFactory(resourceName, resourceConfig);
                if (shallBeStored) this.set(resourceName, object);
                return object;
            } else {
                try {
                    let resource = require(modulePath + resourceConfig.fileName);
                    if (shallBeStored) this.set(resourceName, resource);
                    return resource;
                }
                catch (e) {
                    throw new Error(
                        'can\'t require '
                        + resourceName +
                        ': fileName or path in service config is invalid');
                }
            }
        }
        return undefined;
    }

    getVersion() {
        return _privateProperties.get(this).version;
    }

    objectFactory(resourceName, moduleConfig) {
        let modulePath = this.getConfigKey('modulePath');
        let module = require(modulePath + moduleConfig.fileName);
        let moduleArgs = moduleConfig.args;
        let args = [];
        moduleArgs.forEach(function (moduleName) {
            args.push(this.get(moduleName));
        }, this);
        return new module(...args);
    }
}

let _sharedInstance = new DI();

// default export is a global shared Instance
module.exports = _sharedInstance;

module.exports.getDic = function () {
    return DI;
};
module.exports.getInstance = function () {
    return new DI();
};
module.exports.getSharedInstance = function () {
    return _sharedInstance;
};
