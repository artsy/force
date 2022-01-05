/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetails_Test_QueryVariables = {};
export type ArtworkDetails_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_artwork">;
    } | null;
};
export type ArtworkDetails_Test_Query = {
    readonly response: ArtworkDetails_Test_QueryResponse;
    readonly variables: ArtworkDetails_Test_QueryVariables;
};



/*
query ArtworkDetails_Test_Query {
  artwork(id: "example") {
    ...ArtworkDetails_artwork
    id
  }
}

fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
  description(format: HTML)
}

fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
  additional_information: additionalInformation(format: HTML)
  sale {
    isBenefit
    isGalleryAuction
    id
  }
  partner {
    internalID
    slug
    type
    href
    name
    initials
    locations {
      city
      id
    }
    is_default_profile_public: isDefaultProfilePublic
    profile {
      ...FollowProfileButton_profile
      slug
      icon {
        cropped(width: 45, height: 45) {
          src
          srcSet
        }
      }
      id
    }
    id
  }
}

fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
  category
  series
  publisher
  manufacturer
  image_rights: imageRights
  canRequestLotConditionsReport
  internalID
  framed {
    label
    details
  }
  signatureInfo {
    label
    details
  }
  conditionDescription {
    label
    details
  }
  certificateOfAuthenticity {
    label
    details
  }
  mediumType {
    __typename
  }
  ...ArtworkDetailsMediumModal_artwork
}

fragment ArtworkDetailsArticles_artwork on Artwork {
  articles(size: 10) {
    author {
      name
      id
    }
    href
    publishedAt(format: "MMM Do, YYYY")
    thumbnailImage {
      cropped(width: 200, height: 150) {
        src
        srcSet
      }
    }
    thumbnailTitle
    id
  }
}

fragment ArtworkDetailsMediumModal_artwork on Artwork {
  mediumType {
    name
    longDescription
  }
}

fragment ArtworkDetails_artwork on Artwork {
  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
  ...ArtworkDetailsAboutTheWorkFromPartner_artwork
  ...ArtworkDetailsAdditionalInfo_artwork
  ...ArtworkDetailsArticles_artwork
  articles(size: 10) {
    slug
    id
  }
  literature(format: HTML)
  exhibition_history: exhibitionHistory(format: HTML)
  provenance(format: HTML)
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "label",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "details",
    "storageKey": null
  }
],
v9 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v13 = {
  "type": "ArtworkInfoRow",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v15 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v16 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkDetails_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkDetails_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkDetails_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "description",
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "alias": "additional_information",
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "additionalInformation",
            "storageKey": "additionalInformation(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isBenefit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isGalleryAuction",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "locations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "city",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "is_default_profile_public",
                "args": null,
                "kind": "ScalarField",
                "name": "isDefaultProfilePublic",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": "is_followed",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isFollowed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "icon",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 45
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 45
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": "cropped(height:45,width:45)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "series",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "publisher",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "manufacturer",
            "storageKey": null
          },
          {
            "alias": "image_rights",
            "args": null,
            "kind": "ScalarField",
            "name": "imageRights",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "canRequestLotConditionsReport",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "framed",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "signatureInfo",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "conditionDescription",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "certificateOfAuthenticity",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "longDescription",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 10
              }
            ],
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Author",
                "kind": "LinkedField",
                "name": "author",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do, YYYY"
                  }
                ],
                "kind": "ScalarField",
                "name": "publishedAt",
                "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "thumbnailImage",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 150
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 200
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": "cropped(height:150,width:200)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thumbnailTitle",
                "storageKey": null
              },
              (v2/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": "articles(size:10)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "literature",
            "storageKey": "literature(format:\"HTML\")"
          },
          {
            "alias": "exhibition_history",
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "exhibitionHistory",
            "storageKey": "exhibitionHistory(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": "provenance(format:\"HTML\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.id": (v9/*: any*/),
        "artwork.articles": {
          "type": "Article",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.literature": (v10/*: any*/),
        "artwork.exhibition_history": (v10/*: any*/),
        "artwork.provenance": (v10/*: any*/),
        "artwork.description": (v10/*: any*/),
        "artwork.additional_information": (v10/*: any*/),
        "artwork.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.category": (v10/*: any*/),
        "artwork.series": (v10/*: any*/),
        "artwork.publisher": (v10/*: any*/),
        "artwork.manufacturer": (v10/*: any*/),
        "artwork.image_rights": (v10/*: any*/),
        "artwork.canRequestLotConditionsReport": (v11/*: any*/),
        "artwork.internalID": (v12/*: any*/),
        "artwork.framed": (v13/*: any*/),
        "artwork.signatureInfo": (v13/*: any*/),
        "artwork.conditionDescription": (v13/*: any*/),
        "artwork.certificateOfAuthenticity": (v13/*: any*/),
        "artwork.mediumType": {
          "type": "ArtworkMedium",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.articles.slug": (v10/*: any*/),
        "artwork.articles.id": (v9/*: any*/),
        "artwork.sale.isBenefit": (v11/*: any*/),
        "artwork.sale.isGalleryAuction": (v11/*: any*/),
        "artwork.sale.id": (v9/*: any*/),
        "artwork.partner.internalID": (v12/*: any*/),
        "artwork.partner.slug": (v12/*: any*/),
        "artwork.partner.type": (v10/*: any*/),
        "artwork.partner.href": (v10/*: any*/),
        "artwork.partner.name": (v10/*: any*/),
        "artwork.partner.initials": (v10/*: any*/),
        "artwork.partner.locations": {
          "type": "Location",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.partner.is_default_profile_public": (v11/*: any*/),
        "artwork.partner.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.partner.id": (v9/*: any*/),
        "artwork.framed.label": (v10/*: any*/),
        "artwork.framed.details": (v10/*: any*/),
        "artwork.signatureInfo.label": (v10/*: any*/),
        "artwork.signatureInfo.details": (v10/*: any*/),
        "artwork.conditionDescription.label": (v10/*: any*/),
        "artwork.conditionDescription.details": (v10/*: any*/),
        "artwork.certificateOfAuthenticity.label": (v10/*: any*/),
        "artwork.certificateOfAuthenticity.details": (v10/*: any*/),
        "artwork.mediumType.__typename": (v14/*: any*/),
        "artwork.articles.author": {
          "type": "Author",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.articles.href": (v10/*: any*/),
        "artwork.articles.publishedAt": (v10/*: any*/),
        "artwork.articles.thumbnailImage": (v15/*: any*/),
        "artwork.articles.thumbnailTitle": (v10/*: any*/),
        "artwork.partner.locations.city": (v10/*: any*/),
        "artwork.partner.locations.id": (v9/*: any*/),
        "artwork.partner.profile.slug": (v12/*: any*/),
        "artwork.partner.profile.icon": (v15/*: any*/),
        "artwork.partner.profile.id": (v12/*: any*/),
        "artwork.mediumType.name": (v10/*: any*/),
        "artwork.mediumType.longDescription": (v10/*: any*/),
        "artwork.articles.author.name": (v10/*: any*/),
        "artwork.articles.author.id": (v9/*: any*/),
        "artwork.articles.thumbnailImage.cropped": (v16/*: any*/),
        "artwork.partner.profile.name": (v10/*: any*/),
        "artwork.partner.profile.internalID": (v12/*: any*/),
        "artwork.partner.profile.is_followed": (v11/*: any*/),
        "artwork.partner.profile.icon.cropped": (v16/*: any*/),
        "artwork.articles.thumbnailImage.cropped.src": (v14/*: any*/),
        "artwork.articles.thumbnailImage.cropped.srcSet": (v14/*: any*/),
        "artwork.partner.profile.icon.cropped.src": (v14/*: any*/),
        "artwork.partner.profile.icon.cropped.srcSet": (v14/*: any*/)
      }
    },
    "name": "ArtworkDetails_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkDetails_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtworkDetails_artwork\n    id\n  }\n}\n\nfragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {\n  description(format: HTML)\n}\n\nfragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {\n  additional_information: additionalInformation(format: HTML)\n  sale {\n    isBenefit\n    isGalleryAuction\n    id\n  }\n  partner {\n    internalID\n    slug\n    type\n    href\n    name\n    initials\n    locations {\n      city\n      id\n    }\n    is_default_profile_public: isDefaultProfilePublic\n    profile {\n      ...FollowProfileButton_profile\n      slug\n      icon {\n        cropped(width: 45, height: 45) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  image_rights: imageRights\n  canRequestLotConditionsReport\n  internalID\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  mediumType {\n    __typename\n  }\n  ...ArtworkDetailsMediumModal_artwork\n}\n\nfragment ArtworkDetailsArticles_artwork on Artwork {\n  articles(size: 10) {\n    author {\n      name\n      id\n    }\n    href\n    publishedAt(format: \"MMM Do, YYYY\")\n    thumbnailImage {\n      cropped(width: 200, height: 150) {\n        src\n        srcSet\n      }\n    }\n    thumbnailTitle\n    id\n  }\n}\n\nfragment ArtworkDetailsMediumModal_artwork on Artwork {\n  mediumType {\n    name\n    longDescription\n  }\n}\n\nfragment ArtworkDetails_artwork on Artwork {\n  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork\n  ...ArtworkDetailsAboutTheWorkFromPartner_artwork\n  ...ArtworkDetailsAdditionalInfo_artwork\n  ...ArtworkDetailsArticles_artwork\n  articles(size: 10) {\n    slug\n    id\n  }\n  literature(format: HTML)\n  exhibition_history: exhibitionHistory(format: HTML)\n  provenance(format: HTML)\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n"
  }
};
})();
(node as any).hash = '00e8341863f202ef05b6f34cbe7c8472';
export default node;
