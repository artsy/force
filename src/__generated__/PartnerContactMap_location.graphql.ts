/**
 * @generated SignedSource<<7d9e9706af9c8f1b505ee844c228ef2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerContactMap_location$data = {
  readonly address: string | null | undefined;
  readonly address2: string | null | undefined;
  readonly city: string | null | undefined;
  readonly coordinates: {
    readonly lat: number | null | undefined;
    readonly lng: number | null | undefined;
  } | null | undefined;
  readonly displayCountry: string | null | undefined;
  readonly phone: string | null | undefined;
  readonly postalCode: string | null | undefined;
  readonly state: string | null | undefined;
  readonly " $fragmentType": "PartnerContactMap_location";
};
export type PartnerContactMap_location$key = {
  readonly " $data"?: PartnerContactMap_location$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerContactMap_location">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerContactMap_location",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address2",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "postalCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayCountry",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LatLng",
      "kind": "LinkedField",
      "name": "coordinates",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lat",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lng",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};

(node as any).hash = "2be6af5e124ca605f82560d8ffec41e7";

export default node;
