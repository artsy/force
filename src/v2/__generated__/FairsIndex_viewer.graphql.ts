/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairsIndex_viewer = {
    readonly runningFairs: ReadonlyArray<{
        readonly internalID: string;
        readonly bannerSize: string | null;
        readonly isPublished: boolean | null;
        readonly profile: {
            readonly isPublished: boolean | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FairsFairBanner_fair" | "FairsFairRow_fair">;
    } | null> | null;
    readonly closedFairs: ReadonlyArray<{
        readonly internalID: string;
        readonly isPublished: boolean | null;
        readonly profile: {
            readonly isPublished: boolean | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FairsFairRow_fair">;
    } | null> | null;
    readonly upcomingFairs: ReadonlyArray<{
        readonly internalID: string;
        readonly name: string | null;
        readonly href: string | null;
        readonly startAt: string | null;
        readonly endAt: string | null;
        readonly location: {
            readonly city: string | null;
        } | null;
        readonly isPublished: boolean | null;
        readonly profile: {
            readonly isPublished: boolean | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FairsFairRow_fair">;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"FairsPastFairs_viewer">;
    readonly " $refType": "FairsIndex_viewer";
};
export type FairsIndex_viewer$data = FairsIndex_viewer;
export type FairsIndex_viewer$key = {
    readonly " $data"?: FairsIndex_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairsIndex_viewer">;
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
          "name": "href",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM Do"
            }
          ],
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": "startAt(format:\"MMM Do\")"
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "Do YYYY"
            }
          ],
          "kind": "ScalarField",
          "name": "endAt",
          "storageKey": "endAt(format:\"Do YYYY\")"
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
  "type": "Viewer"
};
})();
(node as any).hash = 'bbfdb22e28544001c8065400eeddc8b5';
export default node;
