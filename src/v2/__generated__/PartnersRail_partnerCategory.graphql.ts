/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersRail_partnerCategory = {
    readonly name: string | null;
    readonly primary: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"PartnerCell_partner">;
    } | null> | null;
    readonly secondary: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"PartnerCell_partner">;
    } | null> | null;
    readonly " $refType": "PartnersRail_partnerCategory";
};
export type PartnersRail_partnerCategory$data = PartnersRail_partnerCategory;
export type PartnersRail_partnerCategory$key = {
    readonly " $data"?: PartnersRail_partnerCategory$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnersRail_partnerCategory">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "defaultProfilePublic",
  "value": true
},
v1 = {
  "kind": "Literal",
  "name": "eligibleForListing",
  "value": true
},
v2 = {
  "kind": "Variable",
  "name": "partnerCategories",
  "variableName": "category"
},
v3 = {
  "kind": "Literal",
  "name": "sort",
  "value": "RANDOM_SCORE_DESC"
},
v4 = {
  "kind": "Variable",
  "name": "type",
  "variableName": "type"
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "PartnerCell_partner"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "category",
      "type": "[String]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "type",
      "type": "[PartnerClassification!]!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersRail_partnerCategory",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "primary",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "Literal",
          "name": "eligibleForPrimaryBucket",
          "value": true
        },
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/)
      ],
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partners",
      "plural": true,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": "secondary",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "Literal",
          "name": "eligibleForSecondaryBucket",
          "value": true
        },
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/)
      ],
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partners",
      "plural": true,
      "selections": (v5/*: any*/),
      "storageKey": null
    }
  ],
  "type": "PartnerCategory"
};
})();
(node as any).hash = 'cc6b6a031766931890033cb1c816dc44';
export default node;
