/**
 * @generated SignedSource<<b02582a3d20d9d39c4b045972d6a9592>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TitleRoute_Test_Query$variables = Record<PropertyKey, never>;
export type TitleRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"SubmissionRoute_submission" | "TitleRoute_submission">;
  } | null | undefined;
};
export type TitleRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly artist: {
      readonly avatar: {
        readonly cropped: {
          readonly height: number;
          readonly src: string;
          readonly srcSet: string;
          readonly width: number;
        } | null | undefined;
      } | null | undefined;
      readonly formattedNationalityAndBirthday: string | null | undefined;
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
};
export type TitleRoute_Test_Query = {
  rawResponse: TitleRoute_Test_Query$rawResponse;
  response: TitleRoute_Test_Query$data;
  variables: TitleRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "submission-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TitleRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TitleRoute_submission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionRoute_submission"
          }
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TitleRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedNationalityAndBirthday",
                "storageKey": null
              },
              {
                "alias": "avatar",
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
                        "name": "height",
                        "value": 38
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 38
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "height",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "cropped(height:38,width:38)"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
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
            "name": "externalId",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "5150df8b98120443daea8e6b84639a78",
    "id": null,
    "metadata": {},
    "name": "TitleRoute_Test_Query",
    "operationKind": "query",
    "text": "query TitleRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...TitleRoute_submission\n    ...SubmissionRoute_submission\n    id\n  }\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n}\n\nfragment TitleRoute_submission on ConsignmentSubmission {\n  title\n  artist {\n    name\n    formattedNationalityAndBirthday\n    avatar: image {\n      cropped(width: 38, height: 38) {\n        src\n        srcSet\n        height\n        width\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "02ca660f920490aaf1810b09ed05bf54";

export default node;
