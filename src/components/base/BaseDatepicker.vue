<template>
  <div class="base-datepicker">
    <label v-if="label" class="base-datepicker__label">
      {{ label }}
    </label>

    <Datepicker
      class="base-datepicker__calendar"
      v-bind="$attrs"
      :locale="locale"
    />

    <span class="base-input__calendar-icon"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Datepicker from 'vue3-datepicker';

import locale from 'date-fns/locale/ru';

export default defineComponent({
  name: 'BaseDatepicker',
  components: {
    Datepicker,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      locale,
    };
  },
});
</script>

<style scoped lang="scss">
.base-datepicker {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 48px;
  padding: 0 9px;

  &__label {
    display: block;
    margin-bottom: 3px;
    font-size: 9px;
    text-transform: uppercase;
    opacity: 0.7;
  }

  /deep/ &__calendar {
    width: 100%;
    padding: 0;
    font-size: $font-size-5;
    color: $color-black;
    border: none;
    outline: none;

    &::placeholder {
      color: $color-grey-5;
    }
  }

  &__calendar-icon {
    position: absolute;
    top: 15px;
    right: 11px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: url('/calendar.svg') no-repeat center;
  }
}
</style>
