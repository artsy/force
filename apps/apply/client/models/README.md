### Adding fields / values to the form

If your custom field doesn't require input from the user then you can set it in the model's defaults

First you need to find the ID of the custom field. You can do this by logging into Salesforce, clicking 'Setup' in the top right navigation, expanding 'Customize' under the 'Build' heading in the left hand sidebar, expanding 'Leads', then clicking 'Fields'. This will bring you to a list of all the fields available as well as any custom fields. Click the field you want and pick its ID out of the URL. For instance: https://na8.salesforce.com/00NC0000005RNdW?setupid=LeadFields yields the ID '00NC0000005RNdW' (which refers to the 'Web Referrer' field.)

Then just add that ID as a default value to the Form model with whatever the value should be.

Long Live Salesforce.
