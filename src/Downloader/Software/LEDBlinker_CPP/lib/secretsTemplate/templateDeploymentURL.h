#ifndef TEMPLATE_DEPLOYMENT_URL_H
#define TEMPLATE_DEPLOYMENT_URL_H

// The URL to retrieve the data from, swap out DEPLOYMENT_ID with the deployment
// ID obtained from the Google Apps Script deployment.
#define SECRET_URL                                      \
    "https://script.google.com/macros/s/DEPLOYMENT_ID/" \
    "exec?selector=lowest&count=5"

#endif  // TEMPLATE_DEPLOYMENT_URL_H