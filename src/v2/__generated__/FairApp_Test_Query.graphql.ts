/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairApp_Test_QueryVariables = {};
export type FairApp_Test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairApp_fair">;
    } | null;
};
export type FairApp_Test_Query = {
    readonly response: FairApp_Test_QueryResponse;
    readonly variables: FairApp_Test_QueryVariables;
};



/*
query FairApp_Test_Query {
  fair(id: "example") {
    ...FairApp_fair
    id
  }
}

fragment ExhibitorsLetterNav_fair on Fair {
  exhibitorsGroupedByName {
    letter
  }
}

fragment FairApp_fair on Fair {
  internalID
  href
  slug
  ...FairMeta_fair
  ...FairHeader_fair
  ...FairHeaderImage_fair
  ...ExhibitorsLetterNav_fair
  counts {
    artworks
  }
  profile {
    id
  }
}

fragment FairHeaderImage_fair on Fair {
  image {
    url(version: "wide")
  }
}

fragment FairHeader_fair on Fair {
  name
  exhibitionPeriod
  profile {
    icon {
      desktop: cropped(width: 80, height: 80, version: "square140") {
        src
        srcSet
        size: width
      }
      mobile: cropped(width: 60, height: 60, version: "square140") {
        src
        srcSet
        size: width
      }
      sticky: cropped(width: 50, height: 50, version: "square140") {
        src
        srcSet
        size: width
      }
    }
    id
  }
}

fragment FairMeta_fair on Fair {
  name
  slug
  metaDescription: summary
  metaImage: image {
    src: url(version: "large_rectangle")
  }
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
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v2 = [
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
  },
  {
    "alias": "size",
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v6 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v10 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairApp_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": "metaDescription",
            "args": null,
            "kind": "ScalarField",
            "name": "summary",
            "storageKey": null
          },
          {
            "alias": "metaImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "src",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large_rectangle"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"large_rectangle\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "exhibitionPeriod",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": "desktop",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 80
                      },
                      (v1/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 80
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:80,version:\"square140\",width:80)"
                  },
                  {
                    "alias": "mobile",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 60
                      },
                      (v1/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 60
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:60,version:\"square140\",width:60)"
                  },
                  {
                    "alias": "sticky",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 50
                      },
                      (v1/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 50
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:50,version:\"square140\",width:50)"
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "wide"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"wide\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FairExhibitorsGroup",
            "kind": "LinkedField",
            "name": "exhibitorsGroupedByName",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "letter",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FairCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "type": "Fair",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.id": (v4/*: any*/),
        "fair.internalID": (v5/*: any*/),
        "fair.href": (v6/*: any*/),
        "fair.slug": (v5/*: any*/),
        "fair.counts": {
          "type": "FairCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.name": (v6/*: any*/),
        "fair.metaDescription": (v6/*: any*/),
        "fair.metaImage": (v7/*: any*/),
        "fair.exhibitionPeriod": (v6/*: any*/),
        "fair.image": (v7/*: any*/),
        "fair.exhibitorsGroupedByName": {
          "type": "FairExhibitorsGroup",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "fair.counts.artworks": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.profile.id": (v4/*: any*/),
        "fair.metaImage.src": (v6/*: any*/),
        "fair.profile.icon": (v7/*: any*/),
        "fair.image.url": (v6/*: any*/),
        "fair.exhibitorsGroupedByName.letter": (v6/*: any*/),
        "fair.profile.icon.desktop": (v8/*: any*/),
        "fair.profile.icon.mobile": (v8/*: any*/),
        "fair.profile.icon.sticky": (v8/*: any*/),
        "fair.profile.icon.desktop.src": (v9/*: any*/),
        "fair.profile.icon.desktop.srcSet": (v9/*: any*/),
        "fair.profile.icon.desktop.size": (v10/*: any*/),
        "fair.profile.icon.mobile.src": (v9/*: any*/),
        "fair.profile.icon.mobile.srcSet": (v9/*: any*/),
        "fair.profile.icon.mobile.size": (v10/*: any*/),
        "fair.profile.icon.sticky.src": (v9/*: any*/),
        "fair.profile.icon.sticky.srcSet": (v9/*: any*/),
        "fair.profile.icon.sticky.size": (v10/*: any*/)
      }
    },
    "name": "FairApp_Test_Query",
    "operationKind": "query",
    "text": "query FairApp_Test_Query {\n  fair(id: \"example\") {\n    ...FairApp_fair\n    id\n  }\n}\n\nfragment ExhibitorsLetterNav_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n  }\n}\n\nfragment FairApp_fair on Fair {\n  internalID\n  href\n  slug\n  ...FairMeta_fair\n  ...FairHeader_fair\n  ...FairHeaderImage_fair\n  ...ExhibitorsLetterNav_fair\n  counts {\n    artworks\n  }\n  profile {\n    id\n  }\n}\n\nfragment FairHeaderImage_fair on Fair {\n  image {\n    url(version: \"wide\")\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  name\n  exhibitionPeriod\n  profile {\n    icon {\n      desktop: cropped(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n      mobile: cropped(width: 60, height: 60, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n      sticky: cropped(width: 50, height: 50, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n    }\n    id\n  }\n}\n\nfragment FairMeta_fair on Fair {\n  name\n  slug\n  metaDescription: summary\n  metaImage: image {\n    src: url(version: \"large_rectangle\")\n  }\n}\n"
  }
};
})();
(node as any).hash = '0d24d146ba08a426b78f8dada6663446';
export default node;
