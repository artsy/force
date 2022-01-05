/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairRoutes_FairQueryVariables = {
    slug: string;
};
export type fairRoutes_FairQueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairApp_fair">;
    } | null;
};
export type fairRoutes_FairQuery = {
    readonly response: fairRoutes_FairQueryResponse;
    readonly variables: fairRoutes_FairQueryVariables;
};



/*
query fairRoutes_FairQuery(
  $slug: String!
) {
  fair(id: $slug) @principalField {
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "fairRoutes_FairQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "fairRoutes_FairQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                      (v2/*: any*/),
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
                    "selections": (v3/*: any*/),
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
                      (v2/*: any*/),
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
                    "selections": (v3/*: any*/),
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
                      (v2/*: any*/),
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
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:50,version:\"square140\",width:50)"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
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
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d3932213ac83a175602224da9339ff25",
    "id": null,
    "metadata": {},
    "name": "fairRoutes_FairQuery",
    "operationKind": "query",
    "text": "query fairRoutes_FairQuery(\n  $slug: String!\n) {\n  fair(id: $slug) @principalField {\n    ...FairApp_fair\n    id\n  }\n}\n\nfragment ExhibitorsLetterNav_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n  }\n}\n\nfragment FairApp_fair on Fair {\n  internalID\n  href\n  slug\n  ...FairMeta_fair\n  ...FairHeader_fair\n  ...FairHeaderImage_fair\n  ...ExhibitorsLetterNav_fair\n  counts {\n    artworks\n  }\n  profile {\n    id\n  }\n}\n\nfragment FairHeaderImage_fair on Fair {\n  image {\n    url(version: \"wide\")\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  name\n  exhibitionPeriod\n  profile {\n    icon {\n      desktop: cropped(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n      mobile: cropped(width: 60, height: 60, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n      sticky: cropped(width: 50, height: 50, version: \"square140\") {\n        src\n        srcSet\n        size: width\n      }\n    }\n    id\n  }\n}\n\nfragment FairMeta_fair on Fair {\n  name\n  slug\n  metaDescription: summary\n  metaImage: image {\n    src: url(version: \"large_rectangle\")\n  }\n}\n"
  }
};
})();
(node as any).hash = '900537b0d9c3bcf5b4e00675b90cf795';
export default node;
