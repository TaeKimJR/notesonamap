const testsContext = require.context('./', true, /Spec\.jsx$/);
testsContext.keys().forEach(testsContext);
