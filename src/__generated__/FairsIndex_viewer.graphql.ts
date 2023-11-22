/**
 * @generated SignedSource<<4ede8e5b532f8790d7df7193cf2eeac5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairsIndex_viewer$data = {
  readonly closedFairs: ReadonlyArray<{
    readonly internalID: string;
    readonly isPublished: boolean | null | undefined;
    readonly profile: {
      readonly isPublished: boolean | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"FairsFairRow_fair">;
  } | null | undefined> | null | undefined;
  readonly runningFairs: ReadonlyArray<{
    readonly bannerSize: string | null | undefined;
    readonly internalID: string;
    readonly isPublished: boolean | null | undefined;
    readonly profile: {
      readonly isPublished: boolean | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"FairsFairBanner_fair" | "FairsFairRow_fair">;
  } | null | undefined> | null | undefined;
  readonly upcomingFairs: ReadonlyArray<{
    readonly exhibitionPeriod: string | null | undefined;
    readonly internalID: string;
    readonly isPublished: boolean | null | undefined;
    readonly location: {
      readonly city: string | null | undefined;
    } | null | undefined;
    readonly name: string | null | undefined;
    readonly organizer: {
      readonly profile: {
        readonly href: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly profile: {
      readonly isPublished: boolean | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"FairsFairRow_fair">;
  } | null | undefined> | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"FairsPastFairs_viewer">;
  readonly " $fragmentType": "FairsIndex_viewer";
};
export type FairsIndex_viewer$key = {
  readonly " $data"?: FairsIndex_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairsIndex_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "hasFullFeature",
  "value": true
},
v1 = {
  "kind": "Literal",
  "name": "hasListing",
  "value": true
},
v2 = {
  "kind": "Literal",
  "name": "size",
  "value": 25
},
v3 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPublished",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profile",
  "plural": false,
  "selections": [
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "FairsFairRow_fair"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairsIndex_viewer",
  "selections": [
    {
      "alias": "runningFairs",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "kind": "Literal",
          "name": "status",
          "value": "RUNNING"
        }
      ],
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fairs",
      "plural": true,
      "selections": [
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bannerSize",
          "storageKey": null
        },
        (v5/*: any*/),
        (v6/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairsFairBanner_fair"
        },
        (v7/*: any*/)
      ],
      "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"RUNNING\")"
    },
    {
      "alias": "closedFairs",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "kind": "Literal",
          "name": "status",
          "value": "CLOSED"
        }
      ],
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fairs",
      "plural": true,
      "selections": [
        (v4/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/)
      ],
      "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"CLOSED\")"
    },
    {
      "alias": "upcomingFairs",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_ASC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "UPCOMING"
        }
      ],
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fairs",
      "plural": true,
      "selections": [
        (v4/*: any*/),
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
          "name": "exhibitionPeriod",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Location",
          "kind": "LinkedField",
          "name": "location",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "city",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        (v5/*: any*/),
        (v6/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FairOrganizer",
          "kind": "LinkedField",
          "name": "organizer",
          "plural": false,
          "selections": [
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
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        (v7/*: any*/)
      ],
      "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_ASC\",status:\"UPCOMING\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairsPastFairs_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "863757b83cf4b9a2c9aab52c1fb95c00";

export default node;
