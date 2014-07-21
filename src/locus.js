/**
 * A window.location simulator based on a whitelist of properties.
 */
void function (win) {

    /**
     * Alias the document and location objects.
     */
    var doc = win.document, loc = win.location,


        /**
         * A whitelist of properties we care about.
        */
        wtls = [
            'protocol',
            'hostname',
            'pathname',
            'search',
            'hash',
            'href'
        ],


        /**
         * Create a subset of a hash object, or get
         * a specified value from a hash object.
         *
         * @param   hash - {}       The hash we're picking from.
         * 
         * @param   subs - []|''    An array of properties to
         *                          construct the hash subset
         *                          or a string to pick the value
         *                          of that named property.
         *
         * @return  {}|''           If given an array, return
         *                          an object with those properties.
         *                          If given a string, return
         *                          the value of that property.
         */
        pick = function (hash, subs) {
            var ret = {}, add = function (prop) {
                    ret[prop] = hash[prop];
                };

            return (
                typeof subs === 'string' ?
                hash[subs] : (subs.forEach(add), ret)
            );
        },


        /**
         * Test a hash objects equality, either in full, or 
         * a subset of the hash object.
         *
         * @param   subj - {}       The hash object we want to test
         *                          against.
         *
         * @param   test - {}       The hash object we're testing
         *                          with.
         *
         * @param   subs - []|''    An array pf properties to test,
         *                          or a string specifying a property
         *                          name to test.
         *
         * @return  true|false      If all the properties are the same,
         *                          the subset of properties are the
         *                          same, or a single property is the
         *                          same return true. Otherwise return
         *                          false.
         */
        eqls = function (subj, test, subs) {
            var check = function (prop) {
                    return test[prop] === subj[prop];
                };

            subs = subs || Object.keys(subj);

            return (
                typeof subs === 'string' ?
                check(subs) : subs.every(check)
            );
        },


        /**
         * The prototype for new locus objects.
         */
        sim = {
            /**
             * Set the path for this instance and return
             * the instance.
             */
            set: function (path) {
                this.anc.href = path;

                return this;
            },

            /**
             * Get a hash object with all, or a
             * subset of the simulated location object.
             */
            get: function (subs) {
                return pick(
                    this.anc,
                    subs || wtls
                );
            },
            
            /**
             * Check if all, or a subset of properties are
             * the same between the real location object
             * and the simulated location object.
             */
            same: function (subs) {
                return eqls(
                    pick(loc, wtls),
                    this.anc, subs
                );
            },

            /**
             * Check if all, or a subset of properties are
             * different between the real location object
             * and the simulated location object.
             */
            diff: function (subs) {
                return !(
                    this.same(subs)
                );
            }
        },


        /**
         * The main entry point for creating new
         * simulated location objects.
         */
        locus = {
            /**
             * Creates a new simulated location object
             * with it's own 'anc' property, and the
             * sim object as it's prototype.
             */
            new: function () {
                return Object.create(sim, {
                    anc: {
                        value: doc.createElement('a'),
                    }
                });
            }
        };


        /**
         * Exposes locus as a global.
         */
        win.locus = locus;

}(window);