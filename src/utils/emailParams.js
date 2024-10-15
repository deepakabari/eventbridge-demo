export const buildEmailParams = (templateData, firstName, email) => {
  return {
    Source: 'akabarideep17@gmail.com',
    Destination: {
      ToAddresses: [email]
    },
    Template: templateData.Template.TemplateName,
    TemplateData: JSON.stringify({
      firstName,
      products: [
        {
          image: 'https://dev-marketplace.cxztrac.com/product/image/connexionFleet.png',
          name: 'Connexion Fleet',
          activationUrl: 'https://dev-marketplace.cxztrac.com/product/connexionFleet'
        },
        {
          image: 'https://dev-marketplace.cxztrac.com/product/image/cdkCustomers.png',
          name: 'CDK Customers',
          activationUrl: 'https://dev-marketplace.cxztrac.com/product/cdkCustomers'
        },
        {
          image: 'https://dev-marketplace.cxztrac.com/product/image/tollaid.png',
          name: 'Toll Collect',
          activationUrl: 'https://dev-marketplace.cxztrac.com/product/tollaid'
        }
      ],
      learnMore: [
        {
          image: 'https://dev-marketplace.cxztrac.com/product/image/connexionFleet.png',
          name: 'Learn More Connexion Fleet',
          activationUrl: 'https://dev-marketplace.cxztrac.com/product/connexionFleet'
        },
        {
          image: 'https://dev-marketplace.cxztrac.com/product/image/cdkCustomers.png',
          name: 'CDK Customers',
          activationUrl: 'https://dev-marketplace.cxztrac.com/product/cdkCustomers'
        },
        {
          image: 'https://dev-marketplace.cxztrac.com/product/image/tollaid.png',
          name: 'Toll Collect',
          activationUrl: 'https://dev-marketplace.cxztrac.com/product/tollaid'
        }
      ]
    })
  }
}
